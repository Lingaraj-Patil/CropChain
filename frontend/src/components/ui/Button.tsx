import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'success';
  loading?: boolean;
  children?: ReactNode;
}

export const Button = ({ className, variant = 'primary', loading, children, ...props }: ButtonProps) => {
  const base = 'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60';
  const variants = {
    primary: 'bg-brand-500 text-white shadow-glow hover:bg-brand-400 hover:-translate-y-0.5',
    secondary: 'border border-white/15 bg-white/5 text-white hover:bg-white/10',
    ghost: 'text-slate-200 hover:bg-white/10',
    success: 'bg-emerald-500 text-white hover:bg-emerald-400',
  } as const;

  return (
    <button className={clsx(base, variants[variant], className)} {...props}>
      {loading ? 'Please wait…' : children}
    </button>
  );
};
