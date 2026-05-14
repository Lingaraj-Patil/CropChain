import type { ReactNode } from 'react';
import clsx from 'clsx';

interface BadgeProps {
  children: ReactNode;
  tone?: 'success' | 'warning' | 'neutral' | 'brand';
}

export const Badge = ({ children, tone = 'neutral' }: BadgeProps) => {
  const tones = {
    success: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/25',
    warning: 'bg-amber-500/15 text-amber-300 border-amber-400/25',
    neutral: 'bg-white/10 text-slate-200 border-white/10',
    brand: 'bg-sky-500/15 text-sky-200 border-sky-400/25',
  } as const;

  return <span className={clsx('inline-flex rounded-full border px-3 py-1 text-xs font-medium', tones[tone])}>{children}</span>;
};
