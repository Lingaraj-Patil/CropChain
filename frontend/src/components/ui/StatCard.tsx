import { Card } from './Card';

interface StatCardProps {
  label: string;
  value: string;
  detail: string;
}

export const StatCard = ({ label, value, detail }: StatCardProps) => (
  <Card className="border-brand-400/10 bg-gradient-to-br from-slate-950 to-slate-900">
    <p className="text-sm text-slate-400">{label}</p>
    <h3 className="mt-3 text-3xl font-bold text-white">{value}</h3>
    <p className="mt-2 text-sm text-slate-300">{detail}</p>
  </Card>
);
