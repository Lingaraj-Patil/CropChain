import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Sprout, BarChart3, ScanSearch, WalletCards } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sampleCrops, sampleStats } from '../data/sampleData';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { CropCard } from '../components/ui/CropCard';

const features = [
  { icon: ShieldCheck, title: 'Blockchain Authenticity', text: 'Each crop NFT is minted on Solana Devnet for immutable provenance.' },
  { icon: ScanSearch, title: 'Consumer Verification', text: 'Consumers can inspect lifecycle data, transaction hashes, and mint addresses.' },
  { icon: BarChart3, title: 'Farmer Insights', text: 'Dashboards surface crop counts, stage progress, and verification analytics.' },
  { icon: WalletCards, title: 'Phantom Wallet Flow', text: 'Seamless Solana wallet connection for secure minting and ownership proofs.' },
];

const HomePage = () => (
  <div className="bg-hero-gradient">
    <section className="mx-auto grid max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-28">
      <div className="max-w-3xl">
        <Badge tone="brand">CropChain • NFT based agricultural traceability</Badge>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 text-5xl font-black tracking-tight text-white md:text-7xl">
          Trust every harvest with blockchain-backed traceability.
        </motion.h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          CropChain helps farmers mint crop NFTs, records the full lifecycle in MongoDB, and lets consumers verify authenticity on Solana Devnet with a premium modern experience.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link to="/register"><Button>Start now <ArrowRight className="h-4 w-4" /></Button></Link>
          <Link to="/verify"><Button variant="secondary">Verify a crop</Button></Link>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {sampleStats.map((stat) => (
            <Card key={stat.label} className="bg-white/5 p-5">
              <p className="text-sm text-slate-400">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
              <p className="mt-2 text-sm text-slate-300">{stat.detail}</p>
            </Card>
          ))}
        </div>
      </div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }} className="rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl shadow-sky-950/20 backdrop-blur-xl">
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Live verification</p>
              <h2 className="text-2xl font-semibold text-white">Crop blockchain trail</h2>
            </div>
            <Sprout className="h-10 w-10 text-brand-300" />
          </div>
          <div className="mt-6 space-y-4">
            {['Seeded', 'Growing', 'Harvested', 'Packed', 'Delivered'].map((stage, index) => (
              <div key={stage} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/15 text-brand-300">0{index + 1}</div>
                <div>
                  <p className="font-medium text-white">{stage}</p>
                  <p className="text-xs text-slate-400">Recorded on Solana and MongoDB</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>

    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Card key={feature.title} className="bg-white/5">
              <Icon className="h-8 w-8 text-brand-300" />
              <h3 className="mt-4 text-xl font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">{feature.text}</p>
            </Card>
          );
        })}
      </div>
    </section>

    <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-300">Featured crops</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Polished traceability cards</h2>
        </div>
        <Link to="/consumer" className="text-sm text-slate-300 hover:text-white">View dashboard</Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {sampleCrops.map((crop) => <CropCard key={crop.id} crop={crop} />)}
      </div>
    </section>
  </div>
);

export default HomePage;
