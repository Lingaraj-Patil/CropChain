import { FormEvent, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../lib/api';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

const VerificationPage = () => {
  const [cropId, setCropId] = useState('');
  const [result, setResult] = useState<any>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const idFromQuery = searchParams.get('cropId');
    if (idFromQuery) {
      setCropId(idFromQuery);
    }
  }, [searchParams]);

  const verify = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await api.get(`/api/crops/${cropId}/verify`);
      setResult(response.data.data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Verification failed');
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <Card>
        <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Verification page</p>
        <h1 className="mt-3 text-4xl font-bold text-white">Verify crop authenticity</h1>
        <form className="mt-8 flex flex-col gap-3 md:flex-row" onSubmit={verify}>
          <Input value={cropId} onChange={(e) => setCropId(e.target.value)} placeholder="Paste crop ID" />
          <Button type="submit"><Search className="h-4 w-4" /> Verify</Button>
        </form>
      </Card>

      {result && (
        <Card className="mt-8">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white">{result.verified ? 'Verified on-chain' : 'Verification pending'}</h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div><p className="text-sm text-slate-400">Mint address</p><p className="break-all text-white">{result.crop.mintAddress || 'N/A'}</p></div>
            <div><p className="text-sm text-slate-400">Transaction hash</p><p className="break-all text-white">{result.crop.transactionHash || 'N/A'}</p></div>
            <div className="md:col-span-2"><p className="text-sm text-slate-400">Metadata URI</p><p className="break-all text-white">{result.crop.metadataUri || 'N/A'}</p></div>
            <div><p className="text-sm text-slate-400">Farmer</p><p className="text-white">{result.crop.farmer?.name}</p></div>
            <div><p className="text-sm text-slate-400">Status</p><Badge tone={result.verified ? 'success' : 'warning'}>{result.crop.currentStage}</Badge></div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            {result.explorerUrl && <a className="text-brand-300" href={result.explorerUrl} target="_blank" rel="noreferrer">Open transaction on explorer</a>}
            {result.mintUrl && <a className="text-brand-300" href={result.mintUrl} target="_blank" rel="noreferrer">Open mint address on explorer</a>}
            {result.crop.metadataUri && <a className="text-brand-300" href={result.crop.metadataUri} target="_blank" rel="noreferrer">Open metadata JSON</a>}
            <Link className="text-brand-300" to={`/crops/${result.crop._id}`}>View crop details</Link>
          </div>
        </Card>
      )}
    </div>
  );
};

export default VerificationPage;
