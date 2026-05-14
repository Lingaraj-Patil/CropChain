import { Navbar } from './Navbar';
import { Footer } from './Footer';
import type { ReactNode } from 'react';

export const AppShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-slate-950 text-white">
    <Navbar />
    <main>{children}</main>
    <Footer />
  </div>
);
