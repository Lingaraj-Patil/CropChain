import { Card } from '../components/ui/Card';

const AboutPage = () => (
  <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
    <Card>
      <p className="text-sm uppercase tracking-[0.3em] text-brand-300">About CropChain</p>
      <h1 className="mt-3 text-4xl font-bold text-white">Transparent agriculture, verified on-chain</h1>
      <p className="mt-6 leading-8 text-slate-300">
        CropChain combines React, Express, MongoDB, and Solana to create a premium traceability platform that helps farmers prove provenance and helps consumers trust what they buy.
      </p>
      <p className="mt-4 leading-8 text-slate-300">
        The system stores crop lifecycle events in MongoDB, mints NFTs on Solana Devnet, and links all blockchain activity back to human-readable agricultural records.
      </p>
    </Card>
  </div>
);

export default AboutPage;
