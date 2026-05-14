import { HTMLAttributes } from 'react';
import clsx from 'clsx';

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx(
      'rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl shadow-sky-950/20 backdrop-blur-xl',
      className
    )}
    {...props}
  />
);
