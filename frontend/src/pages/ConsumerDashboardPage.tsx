import { useEffect, useState } from 'react';
import { Search, ShieldCheck } from 'lucide-react';
import api from '../lib/api';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { CropCard } from '../components/ui/CropCard';

const ConsumerDashboardPage = () => {
  const [query, setQuery] = useState('');
  const [crops, setCrops] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadCrops = async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/crops');
      setCrops(response.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadCrops();
  }, []);

  const search = async () => {
    const response = await api.get('/api/crops/search', { params: { q: query } });
    setCrops(response.data.data);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <Card>
        <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Consumer dashboard</p>
            <h1 className="mt-3 text-4xl font-bold text-white">Search and verify crop authenticity</h1>
            <p className="mt-3 text-slate-300">Inspect the Solana mint address, transaction hash, lifecycle timeline, and farmer details in one place.</p>
          </div>
          <Badge tone="brand"><ShieldCheck className="mr-1 h-3.5 w-3.5" /> Verification enabled</Badge>
        </div>
        <div className="mt-8 flex flex-col gap-3 md:flex-row">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by crop name, type, or farm location" />
          <Button type="button" onClick={search}><Search className="h-4 w-4" /> Search</Button>
        </div>
      </Card>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {loading ? <Card>Loading crops…</Card> : crops.map((crop) => <CropCard key={crop._id} crop={crop} />)}
      </div>
    </div>
  );
};

export default ConsumerDashboardPage;
