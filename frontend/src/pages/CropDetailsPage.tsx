import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ExternalLink } from 'lucide-react';
import api from '../lib/api';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { TimelineStepper } from '../components/ui/TimelineStepper';
import { Button } from '../components/ui/Button';
import { sampleCrops, lifecycleStages } from '../data/index';

type SampleCrop = (typeof sampleCrops)[number];

const getSampleCropById = (cropId: string): SampleCrop | undefined => {
  if (cropId === 'crop-1') {
    return sampleCrops[0];
  }

  if (cropId === 'crop-2') {
    return sampleCrops[1];
  }

  return undefined;
};

const buildSampleTimeline = (currentStage: string) => ({
  events: lifecycleStages.map((stage: string) => ({
    stage,
    title: stage.charAt(0).toUpperCase() + stage.slice(1),
    description: `Sample crop is ${stage}`,
    createdAt: new Date().toISOString(),
  })),
  currentStage,
});

const CropDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const sampleCrop = getSampleCropById(id);
    if (sampleCrop) {
      const sampleStage = (sampleCrop as { currentStage: string }).currentStage;
      setData({
        crop: {
          ...sampleCrop,
          verificationBadge: true,
          currentStage: sampleStage,
          farmer: {
            ...sampleCrop.farmer,
            location: sampleCrop.farmLocation,
            walletAddress: 'Demo wallet',
          },
        },
        timeline: buildSampleTimeline(sampleStage),
      });
      return;
    }

    const loadCrop = async () => {
      try {
        const response = await api.get(`/api/crops/${id}`);
        setData(response.data.data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to load crop details');
      }
    };

    void loadCrop();
  }, [id]);

  if (!data) {
    return <div className="px-4 py-20 text-center text-white">Loading crop details…</div>;
  }

  const { crop, timeline } = data;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <img src={crop.image} alt={crop.cropName} className="h-80 w-full rounded-3xl object-cover" />
          <div className="mt-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Crop</p>
              <h1 className="text-3xl font-bold text-white">{crop.cropName}</h1>
            </div>
            <Badge tone={crop.verificationBadge ? 'success' : 'warning'}>{crop.verificationBadge ? 'Verified' : 'Pending'}</Badge>
          </div>
          <p className="mt-4 text-slate-300">{crop.cropType} • {crop.farmLocation}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {crop.mintAddress && <a href={`https://explorer.solana.com/address/${crop.mintAddress}?cluster=devnet`} target="_blank" rel="noreferrer"><Button variant="secondary"><ExternalLink className="h-4 w-4" /> Mint</Button></a>}
            {crop.transactionHash && <a href={`https://explorer.solana.com/tx/${crop.transactionHash}?cluster=devnet`} target="_blank" rel="noreferrer"><Button variant="secondary"><ExternalLink className="h-4 w-4" /> Transaction</Button></a>}
            {crop.metadataUri && <a href={crop.metadataUri} target="_blank" rel="noreferrer"><Button variant="secondary"><ExternalLink className="h-4 w-4" /> Metadata</Button></a>}
            <Link to="/verify"><Button>Verify another crop</Button></Link>
          </div>
        </Card>
        <div className="space-y-6">
          <Card>
            <h2 className="text-2xl font-bold text-white">Lifecycle timeline</h2>
            <div className="mt-6"><TimelineStepper stages={timeline?.events || []} currentStage={crop.currentStage} /></div>
          </Card>
          <Card>
            <h2 className="text-2xl font-bold text-white">Farmer details</h2>
            <div className="mt-4 space-y-2 text-slate-300">
              <p>{crop.farmer?.name}</p>
              <p>{crop.farmer?.farmName}</p>
              <p>{crop.farmer?.location}</p>
              <p>{crop.farmer?.walletAddress}</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CropDetailsPage;
