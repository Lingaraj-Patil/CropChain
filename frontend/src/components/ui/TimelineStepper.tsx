import { CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';

interface TimelineStepperProps {
  stages: Array<{ stage: string; title: string; description: string; createdAt?: string }>;
  currentStage?: string;
}

const order = ['seeded', 'growing', 'harvested', 'packed', 'delivered'];

export const TimelineStepper = ({ stages, currentStage }: TimelineStepperProps) => {
  const stageMap = new Map(stages.map((item) => [item.stage, item]));

  return (
    <div className="grid gap-4 md:grid-cols-5">
      {order.map((stage) => {
        const active = order.indexOf(stage) <= order.indexOf(currentStage || 'seeded');
        const item = stageMap.get(stage);
        return (
          <div key={stage} className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className={clsx('mb-3 inline-flex rounded-full p-2', active ? 'bg-emerald-500/20 text-emerald-300' : 'bg-white/10 text-slate-400')}>
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <p className="text-sm font-semibold text-white capitalize">{stage}</p>
            <p className="mt-2 text-xs text-slate-300">{item?.title || 'Awaiting update'}</p>
            <p className="mt-1 text-xs text-slate-500">{item?.description || 'Lifecycle step will appear here.'}</p>
          </div>
        );
      })}
    </div>
  );
};
