import { SelectHTMLAttributes } from 'react';
import clsx from 'clsx';

export const Select = ({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) => (
  <select
    className={clsx(
      'w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-500/40',
      className
    )}
    {...props}
  >
    {children}
  </select>
);
