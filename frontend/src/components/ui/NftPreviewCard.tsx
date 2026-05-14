import { motion } from 'framer-motion';
import { CheckCircle2, ExternalLink, Leaf, MapPin, UserRound } from 'lucide-react';
import { Badge } from './Badge';
import { Card } from './Card';

interface NftPreviewCardProps {
  image: string;
  name: string;
  symbol: string;
  farmerName: string;
  cropType: string;
  farmLocation: string;
  organicStatus: string;
  harvestDate: string;
  mintAddress?: string;
  transactionHash?: string;
  metadataUri?: string;
}

const ellipsize = (value?: string) => {
  if (!value) return 'N/A';
  if (value.length <= 18) return value;
  return `${value.slice(0, 8)}...${value.slice(-8)}`;
};

export const NftPreviewCard = ({
  image,
  name,
  symbol,
  farmerName,
  cropType,
  farmLocation,
  organicStatus,
  harvestDate,
  mintAddress,
  transactionHash,
  metadataUri,
}: NftPreviewCardProps) => (
  <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
    <Card className="overflow-hidden border border-brand-400/20 bg-gradient-to-br from-slate-900/90 to-slate-900/60">
      <div className="aspect-[16/9] overflow-hidden rounded-2xl">
        <img src={image} alt={name} className="h-full w-full object-cover" />
      </div>
      <div className="mt-5 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-brand-300">NFT Preview</p>
          <h3 className="mt-2 text-2xl font-bold text-white">{name}</h3>
          <p className="text-sm text-slate-300">Symbol: {symbol}</p>
        </div>
        <Badge tone="success"><CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Blockchain verified</Badge>
      </div>

      <div className="mt-5 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
        <p className="inline-flex items-center gap-2"><UserRound className="h-4 w-4 text-brand-300" /> {farmerName}</p>
        <p className="inline-flex items-center gap-2"><Leaf className="h-4 w-4 text-brand-300" /> {cropType} • {organicStatus}</p>
        <p className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-300" /> {farmLocation}</p>
        <p>Harvest: {new Date(harvestDate).toLocaleDateString()}</p>
      </div>

      <div className="mt-5 grid gap-2 text-sm">
        <p className="text-slate-400">Mint: <span className="text-white">{ellipsize(mintAddress)}</span></p>
        <p className="text-slate-400">Tx: <span className="text-white">{ellipsize(transactionHash)}</span></p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        {mintAddress && (
          <a className="inline-flex items-center gap-1 text-brand-300 hover:text-brand-200" href={`https://explorer.solana.com/address/${mintAddress}?cluster=devnet`} target="_blank" rel="noreferrer">
            Mint on explorer <ExternalLink className="h-4 w-4" />
          </a>
        )}
        {transactionHash && (
          <a className="inline-flex items-center gap-1 text-brand-300 hover:text-brand-200" href={`https://explorer.solana.com/tx/${transactionHash}?cluster=devnet`} target="_blank" rel="noreferrer">
            Transaction <ExternalLink className="h-4 w-4" />
          </a>
        )}
        {metadataUri && (
          <a className="inline-flex items-center gap-1 text-brand-300 hover:text-brand-200" href={metadataUri} target="_blank" rel="noreferrer">
            Metadata JSON <ExternalLink className="h-4 w-4" />
          </a>
        )}
      </div>
    </Card>
  </motion.div>
);
