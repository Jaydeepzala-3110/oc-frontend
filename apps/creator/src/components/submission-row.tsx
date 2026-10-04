'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Check,
  ChevronDown,
  ExternalLink,
  Loader2,
  X,
} from 'lucide-react';
import { adminApi, type AdminSubmission } from '@/lib/api';
import { cn, formatMoney, formatNumber, formatDateTime } from '@/lib/utils';
import { Badge, statusBadgeVariant } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function SubmissionRow({ submission }: { submission: AdminSubmission }) {
  const [open, setOpen] = useState(false);
  const [failNote, setFailNote] = useState<Record<string, string>>({});
  const queryClient = useQueryClient();

  const reviewMutation = useMutation({
    mutationFn: (payload: { checkId: string; passed: boolean; note?: string }) =>
      adminApi.reviewCheck(submission.id, payload),
    onSuccess: (_, payload) => {
      toast.success(
        payload.passed
          ? 'Check approved'
          : 'Check failed — submission rejected',
      );
      queryClient.invalidateQueries({ queryKey: ['admin-submissions'] });
      queryClient.invalidateQueries({ queryKey: ['admin-overview'] });
      queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const reviewable = submission.checks.filter((c) => c.passed === null);

  return (
    <div className="border border-border bg-background/40">
      {/* Summary row */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3 text-left font-mono text-xs hover:bg-accent/40 transition-colors"
      >
        <ChevronDown
          className={cn(
            'h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform',
            open && 'rotate-180',
          )}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-foreground">
            {submission.clipper.firstName} {submission.clipper.lastName}
            {submission.username && (
              <span className="text-muted-foreground"> · @{submission.username}</span>
            )}
          </p>
          <p className="truncate text-muted-foreground">{submission.campaign.title}</p>
        </div>
        <div className="flex items-center gap-2">
          {submission.needsReview && <Badge variant="warning">needs review</Badge>}
          <Badge variant={statusBadgeVariant(submission.submissionStatus)}>
            {submission.submissionStatus}
          </Badge>
        </div>
        <div className="hidden text-right sm:block">
          <p className="tabular text-foreground">{formatNumber(submission.views)} views</p>
          <p className="tabular text-primary">{formatMoney(submission.earnings)}</p>
        </div>
      </button>

      {/* Expanded detail */}
      {open && (
        <div className="space-y-4 border-t border-border px-4 py-4 animate-fade-up">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] text-muted-foreground">
            <a
              href={submission.permalink ?? submission.submissionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:underline"
            >
              Open reel <ExternalLink className="h-3 w-3" />
            </a>
            <span>Submitted {formatDateTime(submission.submittedAt)}</span>
            <span>Synced {formatDateTime(submission.lastMetricsSync)}</span>
            {submission.reviewedAt && <span>Reviewed {formatDateTime(submission.reviewedAt)}</span>}
          </div>

          {submission.metrics && (
            <div className="grid grid-cols-3 gap-px border border-border bg-border sm:grid-cols-6">
              {(
                [
                  ['Views', submission.metrics.views],
                  ['Likes', submission.metrics.likes],
                  ['Comments', submission.metrics.comments],
                  ['Shares', submission.metrics.shares],
                  ['Reach', submission.metrics.reach],
                  ['Eng %', `${submission.metrics.engagementPercent}%`],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="bg-card px-3 py-2.5">
                  <p className="ops-label text-[9px]">{label}</p>
                  <p className="font-mono text-sm font-semibold tabular">
                    {typeof value === 'number' ? formatNumber(value) : value}
                  </p>
                </div>
              ))}
            </div>
          )}

          {submission.rejectionReason && (
            <p className="border border-destructive/30 bg-destructive/10 px-3 py-2 font-mono text-[11px] text-destructive">
              {submission.rejectionCode && (
                <span className="mr-2 font-bold uppercase">{submission.rejectionCode.replaceAll('_', ' ')}</span>
              )}
              {submission.rejectionReason}
            </p>
          )}

          {/* Checks */}
          <div className="space-y-px">
            <p className="ops-label mb-2">Validation Checks</p>
            {submission.checks.map((check) => (
              <div
                key={check.id}
                className="flex flex-col gap-2 border border-border/60 bg-card px-3 py-2.5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-2.5">
                  <span
                    className={cn(
                      'mt-0.5 inline-block h-2 w-2 shrink-0',
                      check.passed === true && 'bg-success',
                      check.passed === false && 'bg-destructive',
                      check.passed === null && 'bg-warning animate-blink',
                    )}
                  />
                  <div className="min-w-0">
                    <p className="font-mono text-xs font-semibold text-foreground">{check.label}</p>
                    {check.detail && (
                      <p className="truncate font-mono text-[11px] text-muted-foreground">{check.detail}</p>
                    )}
                  </div>
                </div>

                {check.passed === null ? (
                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <Input
                      placeholder="note (optional)"
                      className="h-7 w-44 text-[11px]"
                      value={failNote[check.id] ?? ''}
                      onChange={(e) =>
                        setFailNote((prev) => ({ ...prev, [check.id]: e.target.value }))
                      }
                    />
                    <Button
                      size="sm"
                      variant="success"
                      disabled={reviewMutation.isPending}
                      onClick={() =>
                        reviewMutation.mutate({
                          checkId: check.id,
                          passed: true,
                          note: failNote[check.id] || undefined,
                        })
                      }
                    >
                      {reviewMutation.isPending ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Check />
                      )}
                      Pass
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      disabled={reviewMutation.isPending}
                      onClick={() =>
                        reviewMutation.mutate({
                          checkId: check.id,
                          passed: false,
                          note: failNote[check.id] || undefined,
                        })
                      }
                    >
                      <X />
                      Fail
                    </Button>
                  </div>
                ) : (
                  <span
                    className={cn(
                      'font-mono text-[10px] font-bold uppercase tracking-widest',
                      check.passed ? 'text-success' : 'text-destructive',
                    )}
                  >
                    {check.passed ? 'Pass' : 'Fail'}
                  </span>
                )}
              </div>
            ))}
            {submission.checks.length === 0 && (
              <p className="border border-border/60 bg-card px-3 py-4 text-center font-mono text-[11px] text-muted-foreground">
                No structured checks stored for this submission.
              </p>
            )}
          </div>

          {reviewable.length > 0 && (
            <p className="font-mono text-[10px] uppercase tracking-widest text-warning">
              {reviewable.length} check{reviewable.length > 1 ? 's' : ''} awaiting manual decision —
              failing any check rejects the submission and zeroes earnings.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
