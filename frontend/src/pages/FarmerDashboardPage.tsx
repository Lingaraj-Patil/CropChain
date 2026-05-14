import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock3, Upload } from 'lucide-react';
import api from '../lib/api';
import { mintCropNft } from '../lib/solana';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CropCard } from '../components/ui/CropCard';
import { TimelineStepper } from '../components/ui/TimelineStepper';
import { NftPreviewCard } from '../components/ui/NftPreviewCard';

const initialForm = {
  cropName: '',
  cropType: '',
  seedInformation: '',
  fertilizersUsed: '',
  pesticidesUsed: '',
  irrigationMethod: '',
  cultivationDate: '',
  harvestDate: '',
  farmLocation: '',
  organicStatus: 'organic',
  consumerNotes: '',
};

const fileToDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(String(reader.result));
  reader.onerror = () => reject(new Error('Failed to read image file'));
  reader.readAsDataURL(file);
});

const requiredFields = ['cropName', 'cropType', 'seedInformation', 'fertilizersUsed', 'pesticidesUsed', 'irrigationMethod', 'cultivationDate', 'harvestDate', 'farmLocation'] as const;

const getPublicApiUrl = () => {
  const value = import.meta.env.VITE_METADATA_BASE_URL || import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  return String(value).replace(/\/$/, '');
};

const FarmerDashboardPage = () => {
  const wallet = useWallet();
  const [form, setForm] = useState(initialForm);
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [crops, setCrops] = useState<any[]>([]);
  const [summary, setSummary] = useState<any>(null);
  const [stageMap, setStageMap] = useState<Record<string, string>>({});
  const [latestMint, setLatestMint] = useState<any>(null);

  const fetchDashboard = async () => {
    const [summaryResponse, cropsResponse] = await Promise.all([
      api.get('/api/dashboard/summary'),
      api.get('/api/crops'),
    ]);
    setSummary(summaryResponse.data.data);
    setCrops(cropsResponse.data.data);
    const defaults = Object.fromEntries(cropsResponse.data.data.map((crop: any) => [crop._id, crop.currentStage]));
    setStageMap(defaults);
  };

  useEffect(() => {
    void fetchDashboard().catch(() => toast.error('Unable to load dashboard data'));
  }, []);

  const updateField = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();

    const missingField = requiredFields.find((field) => !String(form[field]).trim());
    if (missingField) {
      toast.error(`Please complete the ${missingField.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
      return;
    }

    setLoading(true);
    try {
      if (!image) {
        throw new Error('Please upload a crop image');
      }
      const imageData = await fileToDataUrl(image);
      const createResponse = await api.post('/api/crops', { ...form, image: imageData });
      const crop = createResponse.data.data;
      const metadataUri = `${getPublicApiUrl()}/api/metadata/${crop._id}`;
      const mintResult = await mintCropNft({
        wallet,
        name: crop.nftName || crop.cropName,
        symbol: 'CROP',
        metadataUri,
      });
      await api.patch(`/api/crops/${crop._id}/blockchain`, {
        mintAddress: mintResult.mintAddress,
        transactionHash: mintResult.transactionHash,
        metadataUri,
      });
      await fetchDashboard();
      setLatestMint({
        crop,
        mintResult,
        metadataUri,
      });
      setForm(initialForm);
      setImage(null);
      toast.success('Crop NFT minted and stored successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Minting failed');
    } finally {
      setLoading(false);
    }
  };

  const updateStage = async (cropId: string) => {
    const stage = stageMap[cropId];
    try {
      await api.patch(`/api/crops/${cropId}/timeline`, {
        stage,
        title: stage.charAt(0).toUpperCase() + stage.slice(1),
        description: `Crop stage updated to ${stage}`,
      });
      toast.success('Timeline updated');
      await fetchDashboard();
    } catch {
      toast.error('Unable to update timeline');
    }
  };

  const analytics = useMemo(() => [
    { label: 'My crops', value: String(summary?.cropsCount || 0) },
    { label: 'Transactions', value: String(summary?.transactionCount || 0) },
    { label: 'Phantom wallet', value: wallet.publicKey ? 'Connected' : 'Disconnected' },
  ], [summary, wallet.publicKey]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-3">
        {analytics.map((item) => (
          <Card key={item.label} className="bg-white/5">
            <p className="text-sm text-slate-400">{item.label}</p>
            <h2 className="mt-2 text-3xl font-bold text-white">{item.value}</h2>
          </Card>
        ))}
      </div>

      <div className="mt-10 grid gap-10 xl:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Farmer dashboard</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Create Crop NFT</h2>
            </div>
            <Badge tone={wallet.connected ? 'success' : 'warning'}>{wallet.connected ? 'Wallet connected' : 'Connect Phantom'}</Badge>
          </div>
          <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleCreate}>
            <Input placeholder="Crop name" value={form.cropName} onChange={(e) => updateField('cropName', e.target.value)} />
            <Input placeholder="Crop type" value={form.cropType} onChange={(e) => updateField('cropType', e.target.value)} />
            <Input placeholder="Seed information" value={form.seedInformation} onChange={(e) => updateField('seedInformation', e.target.value)} />
            <Input placeholder="Fertilizers used" value={form.fertilizersUsed} onChange={(e) => updateField('fertilizersUsed', e.target.value)} />
            <Input placeholder="Pesticides used" value={form.pesticidesUsed} onChange={(e) => updateField('pesticidesUsed', e.target.value)} />
            <Input placeholder="Irrigation method" value={form.irrigationMethod} onChange={(e) => updateField('irrigationMethod', e.target.value)} />
            <Input type="date" value={form.cultivationDate} onChange={(e) => updateField('cultivationDate', e.target.value)} />
            <Input type="date" value={form.harvestDate} onChange={(e) => updateField('harvestDate', e.target.value)} />
            <Input placeholder="Farm location" className="md:col-span-2" value={form.farmLocation} onChange={(e) => updateField('farmLocation', e.target.value)} />
            <Select value={form.organicStatus} onChange={(e) => updateField('organicStatus', e.target.value)}>
              <option value="organic">Organic</option>
              <option value="non-organic">Non-organic</option>
            </Select>
            <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-3 text-sm text-slate-300 md:col-span-1">
              <Upload className="h-4 w-4" />
              <span>{image ? image.name : 'Upload crop image'}</span>
              <input className="hidden" type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
            </label>
            <Textarea className="md:col-span-2" placeholder="Consumer notes" value={form.consumerNotes} onChange={(e) => updateField('consumerNotes', e.target.value)} />
            <Button type="submit" loading={loading} className="md:col-span-2">Mint crop NFT</Button>
          </form>
        </Card>

        <div className="space-y-6">
          {latestMint && (
            <NftPreviewCard
              image={latestMint.crop.image}
              name={latestMint.crop.nftName || latestMint.crop.cropName}
              symbol="CROP"
              farmerName={latestMint.crop?.farmer?.name || 'Connected farmer'}
              cropType={latestMint.crop.cropType}
              farmLocation={latestMint.crop.farmLocation}
              organicStatus={latestMint.crop.organicStatus}
              harvestDate={latestMint.crop.harvestDate}
              mintAddress={latestMint.mintResult.mintAddress}
              transactionHash={latestMint.mintResult.transactionHash}
              metadataUri={latestMint.metadataUri}
            />
          )}
          <Card>
            <div className="flex items-center gap-2 text-white"><Clock3 className="h-5 w-5 text-brand-300" /> Lifecycle management</div>
            <p className="mt-3 text-sm text-slate-400">Update crop stages as the harvest moves from seeded to delivered.</p>
          </Card>
          <div className="grid gap-6">
            {crops.slice(0, 3).map((crop) => (
              <Card key={crop._id}>
                <CropCard crop={crop} />
                <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
                  <Select value={stageMap[crop._id] || crop.currentStage} onChange={(e) => setStageMap((prev) => ({ ...prev, [crop._id]: e.target.value }))}>
                    {['seeded', 'growing', 'harvested', 'packed', 'delivered'].map((stage) => <option key={stage} value={stage}>{stage}</option>)}
                  </Select>
                  <Button type="button" variant="secondary" onClick={() => updateStage(crop._id)}>Update stage</Button>
                </div>
                {crop.timeline && <div className="mt-4"><TimelineStepper stages={crop.timeline.events || []} currentStage={crop.currentStage} /></div>}
              </Card>
            ))}
          </div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
        <Card>
          <div className="flex items-center gap-2 text-emerald-300"><CheckCircle2 className="h-5 w-5" /> Recent crop NFTs</div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {crops.map((crop) => <CropCard key={crop._id} crop={crop} />)}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default FarmerDashboardPage;
