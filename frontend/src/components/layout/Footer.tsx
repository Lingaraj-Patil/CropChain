import { Link } from 'react-router-dom';

export const Footer = () => (
  <footer className="border-t border-white/10 bg-slate-950">
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 text-sm text-slate-400 sm:px-6 lg:grid-cols-3 lg:px-8">
      <div>
        <p className="text-lg font-semibold text-white">CropChain</p>
        <p className="mt-3 max-w-sm leading-7">A blockchain-powered agricultural traceability system for farmers, buyers, and consumers.</p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-semibold text-white">Quick links</p>
        <Link to="/about">About</Link>
        <Link to="/verify">Verify crop</Link>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <p className="font-semibold text-white">Deployment</p>
        <p className="mt-3 leading-7">Frontend and backend are structured for Vercel-ready deployment with environment-driven configuration.</p>
      </div>
    </div>
  </footer>
);
