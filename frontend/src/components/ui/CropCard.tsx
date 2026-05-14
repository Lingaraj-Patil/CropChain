import { motion } from 'framer-motion';
import { ArrowUpRight, Copy, ShieldCheck, MapPin, Sprout } from 'lucide-react';
import { Card } from './Card';
import { Badge } from './Badge';
import { Link } from 'react-router-dom';

interface CropCardProps {
  crop: any;
}

export const CropCard = ({ crop }: CropCardProps) => (
  <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.25 }}>
    <Card className="h-full overflow-hidden">
      <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-slate-900">
        <img src={crop.image} alt={crop.cropName} className="h-full w-full object-cover" />
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-white">{crop.cropName}</h3>
          <p className="mt-1 text-sm text-slate-400">{crop.cropType}</p>
        </div>
        <Badge tone={crop.organicStatus === 'organic' ? 'success' : 'warning'}>
          {crop.organicStatus}
        </Badge>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm text-slate-300"><MapPin className="h-4 w-4" /> {crop.farmLocation}</div>
      <div className="mt-2 flex items-center gap-2 text-sm text-slate-300"><Sprout className="h-4 w-4" /> {crop.currentStage}</div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="brand"><ShieldCheck className="mr-1 h-3.5 w-3.5" /> Verified</Badge>
        <Badge>{crop.farmer?.farmName || crop.farmer?.name || 'Farmer'}</Badge>
      </div>
      <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
        <p className="text-xs text-slate-400">Crop ID</p>
        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="truncate text-xs font-medium text-white" title={crop._id || crop.id}>{crop._id || crop.id || 'N/A'}</p>
          {(crop._id || crop.id) && (
            <button
              type="button"
              onClick={() => {
                void navigator.clipboard.writeText(String(crop._id || crop.id));
              }}
              className="inline-flex items-center gap-1 rounded-full border border-white/15 px-2 py-1 text-xs text-slate-200 hover:bg-white/10"
            >
              <Copy className="h-3.5 w-3.5" /> Copy
            </button>
          )}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
        <div className="flex items-center gap-3">
          <Link to={`/crops/${crop._id || crop.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-300 hover:text-brand-200">
            View details <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link to={`/verify?cropId=${crop._id || crop.id}`} className="text-xs font-semibold text-emerald-300 hover:text-emerald-200">
            Verify now
          </Link>
        </div>
        <span className="text-xs text-slate-500">Devnet ready</span>
      </div>
    </Card>
  </motion.div>
);
