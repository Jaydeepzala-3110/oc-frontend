'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { formatMoney, formatNumber, formatDateTime, cn } from '@/lib/utils';
import { Badge, statusBadgeVariant } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function OverviewPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['admin-overview'],
    queryFn: adminApi.overview,
    refetchInterval: 60_000,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !data) {
    return <p className="font-mono text-sm text-destructive">Failed to load overview.</p>;
  }

  const activeCampaigns = data.campaigns['ACTIVE'] ?? 0;
  const pending = data.submissions['PENDING'] ?? 0;
  const verified = data.submissions['VERIFIED'] ?? 0;
  const rejected = data.submissions['REJECTED'] ?? 0;

  const stats: { label: string; value: string; accent?: string; href?: string }[] = [
    { label: 'Active Campaigns', value: formatNumber(activeCampaigns), href: '/dashboard/campaigns' },
    { label: 'Pending Approval', value: formatNumber(pending), accent: 'text-warning', href: '/dashboard/review' },
    { label: 'Verified', value: formatNumber(verified), accent: 'text-success' },
    { label: 'Rejected', value: formatNumber(rejected), accent: 'text-destructive' },
    { label: 'Tracked Views', value: formatNumber(data.totalViews) },
    { label: 'Payout Liability', value: formatMoney(data.totalEarnings), accent: 'text-primary' },
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="ops-label mb-1">Telemetry / Live</p>
          <h1 className="font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">
            Overview
          </h1>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Auto-refresh 60s
        </p>
      </header>

      <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 xl:grid-cols-6 border border-border">
        {stats.map((stat) => {
          const inner = (
            <div className="bg-card px-4 py-5 transition-colors hover:bg-accent h-full">
              <p className="ops-label mb-2">{stat.label}</p>
              <p className={cn('font-display text-2xl font-black tabular sm:text-3xl', stat.accent)}>
                {stat.value}
              </p>
            </div>
          );
          return stat.href ? (
            <Link key={stat.label} href={stat.href}>{inner}</Link>
          ) : (
            <div key={stat.label}>{inner}</div>
          );
        })}
      </div>

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Latest Submissions</CardTitle>
          <Link
            href="/dashboard/review"
            className="flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-primary hover:underline"
          >
            Review queue <ArrowUpRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          {data.recentSubmissions.length === 0 ? (
            <p className="px-5 py-10 text-center font-mono text-xs text-muted-foreground">
              No submissions yet. They will appear here as clippers submit reels.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-border">
                    <th className="ops-label px-5 py-3">Clipper</th>
                    <th className="ops-label px-5 py-3">Campaign</th>
                    <th className="ops-label px-5 py-3">Status</th>
                    <th className="ops-label px-5 py-3 text-right">Views</th>
                    <th className="ops-label px-5 py-3 text-right">Earnings</th>
                    <th className="ops-label px-5 py-3 hidden md:table-cell">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentSubmissions.map((s) => (
                    <tr key={s.id} className="border-b border-border/50 last:border-0 hover:bg-accent/50 transition-colors">
                      <td className="px-5 py-3">
                        <p className="font-semibold text-foreground">
                          {s.clipper.firstName} {s.clipper.lastName}
                        </p>
                        {s.username && <p className="text-muted-foreground">@{s.username}</p>}
                      </td>
                      <td className="max-w-[220px] truncate px-5 py-3 text-muted-foreground">
                        {s.campaign.title}
                      </td>
                      <td className="px-5 py-3">
                        <Badge variant={statusBadgeVariant(s.submissionStatus)}>
                          {s.submissionStatus}
                        </Badge>
                        {s.needsReview && (
                          <Badge variant="warning" className="ml-1.5">review</Badge>
                        )}
                      </td>
                      <td className="px-5 py-3 text-right tabular">{formatNumber(s.views)}</td>
                      <td className="px-5 py-3 text-right tabular text-primary">{formatMoney(s.earnings)}</td>
                      <td className="hidden px-5 py-3 text-muted-foreground md:table-cell">
                        {formatDateTime(s.submittedAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
