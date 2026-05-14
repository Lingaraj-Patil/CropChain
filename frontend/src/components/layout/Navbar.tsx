import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, Sprout, ShieldCheck, X } from 'lucide-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useAuthContext } from '../../context/AuthContext';
import { Button } from '../ui/Button';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/verify', label: 'Verify' },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 text-white">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-300 ring-1 ring-brand-400/20">
            <Sprout className="h-5 w-5" />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-300">CropChain</p>
            <p className="text-xs text-slate-400">Agri traceability</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => `text-sm transition ${isActive ? 'text-white' : 'text-slate-300 hover:text-white'}`}>
              {link.label}
            </NavLink>
          ))}
          {user && (
            <NavLink to={user.role === 'farmer' ? '/farmer' : '/consumer'} className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white">
              <ShieldCheck className="h-4 w-4" /> Dashboard
            </NavLink>
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <WalletMultiButton className="!rounded-full !bg-white/10 !px-5 !py-3 !text-sm !font-semibold" />
          {user ? (
            <Button
              variant="secondary"
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              Logout
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/login')}>Login</Button>
              <Button onClick={() => navigate('/register')}>Get Started</Button>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-slate-950/95 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className="text-sm text-slate-200">
                {link.label}
              </NavLink>
            ))}
            <div className="pt-2">
              <WalletMultiButton className="!w-full !rounded-full !bg-white/10 !px-5 !py-3 !text-sm !font-semibold" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
