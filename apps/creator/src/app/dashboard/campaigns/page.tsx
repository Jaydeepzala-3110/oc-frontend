'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Loader2, Plus, Search } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { formatMoney, formatNumber, cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const STATUS_VARIANT: Record<string, 'success' | 'secondary' | 'warning' | 'destructive'> = {
  ACTIVE: 'success',
  PAUSED: 'warning',
  DRAFT: 'secondary',
  COMPLETED: 'secondary',
  INACTIVE: 'destructive',
};

export default function CampaignsPage() {
  const [search, setSearch] = useState('');
  const { data, isLoading } = useQuery({
    queryKey: ['admin-campaigns'],
    queryFn: adminApi.campaigns,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  const campaigns = (data ?? []).filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6 animate-fade-up">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="ops-label mb-1">Inventory / {data?.length ?? 0} total</p>
          <h1 className="font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">
            Campaigns
          </h1>
        </div>
        <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
          <div className="relative flex-1 sm:w-64 sm:flex-none">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Filter by title…"
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Link href="/dashboard/campaigns/new">
            <Button>
              <Plus />
              New Campaign
            </Button>
          </Link>
        </div>
      </header>

      <div className="ops-panel overflow-x-auto">
        <table className="w-full min-w-[880px] text-left font-mono text-xs">
          <thead>
            <tr className="border-b border-border">
              <th className="ops-label px-5 py-3">Campaign</th>
              <th className="ops-label px-5 py-3">Type</th>
              <th className="ops-label px-5 py-3">Status</th>
              <th className="ops-label px-5 py-3 text-right">Rate</th>
              <th className="ops-label px-5 py-3 text-right">Budget</th>
              <th className="ops-label px-5 py-3 text-center">P / V / R</th>
              <th className="ops-label px-5 py-3 text-right">Views</th>
              <th className="ops-label px-5 py-3 text-right">Paid Out</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} className="group border-b border-border/50 last:border-0 hover:bg-accent/50 transition-colors">
                <td className="px-5 py-3.5">
                  <Link href={`/dashboard/campaigns/${c.id}`} className="block">
                    <p className="max-w-[260px] truncate font-semibold text-foreground group-hover:text-primary transition-colors">
                      {c.title}
                    </p>
                    <p className="text-muted-foreground">
                      #{c.id} · {c.participantCount} joined
                    </p>
                  </Link>
                </td>
                <td className="px-5 py-3.5">
                  <Badge variant="outline">{c.type}</Badge>
                </td>
                <td className="px-5 py-3.5">
                  <Badge variant={STATUS_VARIANT[c.status] ?? 'secondary'}>{c.status}</Badge>
                </td>
                <td className="px-5 py-3.5 text-right tabular">
                  ${c.payRate}/{c.payUnit.replace(' views', '')}
                </td>
                <td className="px-5 py-3.5 text-right tabular">{formatMoney(c.budget)}</td>
                <td className="px-5 py-3.5 text-center tabular">
                  <span className="text-warning">{c.pendingCount}</span>
                  <span className="text-muted-foreground"> / </span>
                  <span className="text-success">{c.verifiedCount}</span>
                  <span className="text-muted-foreground"> / </span>
                  <span className="text-destructive">{c.rejectedCount}</span>
                </td>
                <td className="px-5 py-3.5 text-right tabular">{formatNumber(c.totalViews)}</td>
                <td className={cn('px-5 py-3.5 text-right tabular', c.totalEarnings > 0 && 'text-primary')}>
                  {formatMoney(c.totalEarnings)}
                </td>
              </tr>
            ))}
            {campaigns.length === 0 && (
              <tr>
                <td colSpan={8} className="px-5 py-12 text-center text-muted-foreground">
                  No campaigns match “{search}”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
