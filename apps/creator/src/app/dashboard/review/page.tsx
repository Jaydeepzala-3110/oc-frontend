'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { cn } from '@/lib/utils';
import { SubmissionRow } from '@/components/submission-row';

const TABS = [
  { id: 'review', label: 'Needs Review' },
  { id: 'PENDING', label: 'Pending' },
  { id: 'VERIFIED', label: 'Verified' },
  { id: 'REJECTED', label: 'Rejected' },
  { id: 'all', label: 'All' },
] as const;

type TabId = (typeof TABS)[number]['id'];

export default function ReviewPage() {
  const [tab, setTab] = useState<TabId>('review');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-submissions', {}],
    queryFn: () => adminApi.submissions(),
    refetchInterval: 60_000,
  });

  const submissions = useMemo(() => {
    const all = data ?? [];
    if (tab === 'all') return all;
    if (tab === 'review') return all.filter((s) => s.needsReview && s.submissionStatus !== 'REJECTED');
    return all.filter((s) => s.submissionStatus === tab);
  }, [data, tab]);

  const counts = useMemo(() => {
    const all = data ?? [];
    return {
      review: all.filter((s) => s.needsReview && s.submissionStatus !== 'REJECTED').length,
      PENDING: all.filter((s) => s.submissionStatus === 'PENDING').length,
      VERIFIED: all.filter((s) => s.submissionStatus === 'VERIFIED').length,
      REJECTED: all.filter((s) => s.submissionStatus === 'REJECTED').length,
      all: all.length,
    } as Record<TabId, number>;
  }, [data]);

  return (
    <div className="space-y-6 animate-fade-up">
      <header>
        <p className="ops-label mb-1">Moderation / Manual decisions</p>
        <h1 className="font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">
          Review Queue
        </h1>
      </header>

      <div className="flex flex-wrap gap-px border border-border bg-border">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              'flex-1 min-w-[100px] px-3 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors',
              tab === t.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-muted-foreground hover:text-foreground',
            )}
          >
            {t.label}
            <span className="ml-1.5 opacity-60 tabular">{counts[t.id] ?? 0}</span>
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : submissions.length === 0 ? (
        <div className="ops-panel py-16 text-center">
          <p className="font-mono text-xs text-muted-foreground">
            {tab === 'review'
              ? 'Queue clear — nothing awaiting manual review.'
              : 'No submissions in this state.'}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map((s) => (
            <SubmissionRow key={s.id} submission={s} />
          ))}
        </div>
      )}
    </div>
  );
}
