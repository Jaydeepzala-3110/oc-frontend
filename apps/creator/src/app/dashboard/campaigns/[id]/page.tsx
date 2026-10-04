'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ChevronLeft, ExternalLink, Loader2 } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { formatMoney, formatNumber, formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SubmissionRow } from '@/components/submission-row';

const CONFIG_LABELS: Record<string, string> = {
  minimumViewsForApproval: 'Views to approve',
  minimumViewsForEarnings: 'Views to earn',
  minimumDurationSeconds: 'Min duration (s)',
  minimumEngagementPercent: 'Min engagement %',
  maxSubmissionsPerAccount: 'Max subs / account',
  maxEarningsPerSubmission: 'Cap / submission ($)',
  maxEarningsPerUser: 'Cap / user ($)',
};

export default function CampaignDetailPage() {
  const { id } = useParams();
  const campaignId = Number(id);

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['admin-campaigns'],
    queryFn: adminApi.campaigns,
  });

  const { data: submissions } = useQuery({
    queryKey: ['admin-submissions', { campaignId }],
    queryFn: () => adminApi.submissions({ campaignId }),
    enabled: Number.isFinite(campaignId),
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const campaign = campaigns?.find((c) => c.id === campaignId);
  if (!campaign) {
    return <p className="font-mono text-sm text-destructive">Campaign not found.</p>;
  }

  const config = (campaign.typeConfig ?? {}) as Record<string, unknown>;
  const thresholds = Object.entries(CONFIG_LABELS)
    .map(([key, label]) => ({ label, value: config[key] }))
    .filter((t) => t.value !== undefined && t.value !== null);
  const sounds = Array.isArray(config.sounds) ? (config.sounds as any[]) : [];
  const guidelines = Array.isArray(config.guidelines) ? (config.guidelines as any[]) : [];

  return (
    <div className="space-y-8 animate-fade-up">
      <header className="space-y-4">
        <Link
          href="/dashboard/campaigns"
          className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="h-3 w-3" /> Campaigns
        </Link>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{campaign.type}</Badge>
              <Badge variant={campaign.status === 'ACTIVE' ? 'success' : 'secondary'}>
                {campaign.status}
              </Badge>
              {campaign.platforms.map((p) => (
                <Badge key={p} variant="secondary">{p}</Badge>
              ))}
            </div>
            <h1 className="max-w-3xl font-display text-2xl font-black uppercase tracking-tight sm:text-3xl">
              {campaign.title}
            </h1>
            <p className="font-mono text-xs text-muted-foreground">
              ${campaign.payRate}/{campaign.payUnit} · budget {formatMoney(campaign.budget)} · ends {formatDate(campaign.endDate)}
            </p>
          </div>
          {campaign.image && (
            <img
              src={campaign.image}
              alt=""
              className="h-20 w-20 border border-border object-cover"
            />
          )}
        </div>
      </header>

      <div className="grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">
        {[
          { label: 'Joined', value: formatNumber(campaign.participantCount) },
          { label: 'Submissions', value: formatNumber(campaign.submissionCount) },
          { label: 'Views', value: formatNumber(campaign.totalViews) },
          { label: 'Paid Out', value: formatMoney(campaign.totalEarnings), accent: true },
        ].map((s) => (
          <div key={s.label} className="bg-card px-4 py-4">
            <p className="ops-label mb-1.5">{s.label}</p>
            <p className={`font-display text-xl font-black tabular ${s.accent ? 'text-primary' : ''}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Validation Thresholds</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {thresholds.length === 0 ? (
              <p className="px-5 py-8 text-center font-mono text-xs text-muted-foreground">
                No type config — submissions verify on structural checks only.
              </p>
            ) : (
              <dl className="divide-y divide-border/50 font-mono text-xs">
                {thresholds.map((t) => (
                  <div key={t.label} className="flex items-center justify-between px-5 py-3">
                    <dt className="text-muted-foreground">{t.label}</dt>
                    <dd className="font-semibold tabular">{formatNumber(Number(t.value))}</dd>
                  </div>
                ))}
                {sounds.length > 0 && (
                  <div className="px-5 py-3">
                    <dt className="mb-2 text-muted-foreground">Required sounds</dt>
                    <dd className="space-y-1">
                      {sounds.map((s, i) => (
                        <p key={i} className="text-foreground">
                          <span className="text-primary">♪</span> {s.soundName ?? s.soundId}
                          <span className="text-muted-foreground"> ({s.platform})</span>
                        </p>
                      ))}
                    </dd>
                  </div>
                )}
              </dl>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="p-0 max-h-80 overflow-y-auto">
            {guidelines.length === 0 ? (
              <p className="px-5 py-8 text-center font-mono text-xs text-muted-foreground">
                No structured guidelines.
              </p>
            ) : (
              <ul className="divide-y divide-border/50 font-mono text-xs">
                {guidelines.map((g, i) => (
                  <li key={i} className="flex gap-3 px-5 py-3">
                    <span className={g.kind === 'DONT' ? 'text-destructive' : 'text-success'}>
                      {g.kind === 'DONT' ? '✕' : '✓'}
                    </span>
                    <span className="text-muted-foreground leading-relaxed">{g.content}</span>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Submissions ({submissions?.length ?? 0})</CardTitle>
          <Link
            href="/dashboard/review"
            className="flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary hover:underline"
          >
            Full queue <ExternalLink className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent className="space-y-3 p-4">
          {(submissions ?? []).length === 0 ? (
            <p className="py-6 text-center font-mono text-xs text-muted-foreground">
              No submissions for this campaign yet.
            </p>
          ) : (
            submissions!.map((s) => <SubmissionRow key={s.id} submission={s} />)
          )}
        </CardContent>
      </Card>
    </div>
  );
}
