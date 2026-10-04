'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { toast } from 'sonner';
import { ChevronLeft, Loader2, Rocket } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { adminAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PLATFORMS = ['INSTAGRAM', 'TIKTOK', 'YOUTUBE', 'TWITTER', 'FACEBOOK'];
const TYPES = ['CLIP', 'UGC', 'MUSIC_PROMO', 'CHALLENGE', 'AFFILIATE'];

interface FormState {
  title: string;
  description: string;
  image: string;
  type: string;
  platforms: string[];
  payRate: string;
  budget: string;
  endDate: string;
  minimumPostDate: string;
  // clip typeConfig
  minimumViewsForApproval: string;
  minimumViewsForEarnings: string;
  minimumEngagementPercent: string;
  maxSubmissionsPerAccount: string;
  maxEarningsPerSubmission: string;
  maxEarningsPerUser: string;
}

const INITIAL: FormState = {
  title: '',
  description: '',
  image: '',
  type: 'CLIP',
  platforms: ['INSTAGRAM'],
  payRate: '1',
  budget: '1000',
  endDate: '',
  minimumPostDate: '',
  minimumViewsForApproval: '',
  minimumViewsForEarnings: '',
  minimumEngagementPercent: '',
  maxSubmissionsPerAccount: '',
  maxEarningsPerSubmission: '',
  maxEarningsPerUser: '',
};

function num(value: string): number | undefined {
  const parsed = Number(value);
  return value.trim() !== '' && Number.isFinite(parsed) && parsed > 0
    ? parsed
    : undefined;
}

export default function NewCampaignPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<FormState>(INITIAL);

  const set = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const togglePlatform = (platform: string) =>
    setForm((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));

  const createMutation = useMutation({
    mutationFn: async () => {
      const clientId = adminAuth.getPayload()?.sub;
      if (!clientId) throw new Error('Session expired');
      if (!form.title.trim()) throw new Error('Title is required');
      if (!form.description.trim()) throw new Error('Description is required');
      if (!form.platforms.length) throw new Error('Pick at least one platform');
      if (!form.endDate) throw new Error('End date is required');

      const typeConfig: Record<string, unknown> = {};
      const configFields: [keyof FormState, string][] = [
        ['minimumViewsForApproval', 'minimumViewsForApproval'],
        ['minimumViewsForEarnings', 'minimumViewsForEarnings'],
        ['minimumEngagementPercent', 'minimumEngagementPercent'],
        ['maxSubmissionsPerAccount', 'maxSubmissionsPerAccount'],
        ['maxEarningsPerSubmission', 'maxEarningsPerSubmission'],
        ['maxEarningsPerUser', 'maxEarningsPerUser'],
      ];
      for (const [field, key] of configFields) {
        const value = num(form[field] as string);
        if (value !== undefined) typeConfig[key] = value;
      }

      return adminApi.createCampaign({
        clientId,
        title: form.title.trim(),
        description: form.description.trim(),
        requirements: form.description.trim(),
        image: form.image.trim() || undefined,
        type: form.type,
        typeConfig,
        status: 'ACTIVE',
        platforms: form.platforms,
        startDate: new Date().toISOString(),
        endDate: new Date(form.endDate).toISOString(),
        minimumPostDate: form.minimumPostDate
          ? new Date(form.minimumPostDate).toISOString()
          : undefined,
        payRate: num(form.payRate) ?? 1,
        payUnit: '1K views',
        budget: num(form.budget) ?? 0,
      });
    },
    onSuccess: () => {
      toast.success('Campaign launched');
      queryClient.invalidateQueries({ queryKey: ['admin-campaigns'] });
      router.push('/dashboard/campaigns');
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <div className="mx-auto max-w-3xl space-y-8 animate-fade-up">
      <header className="space-y-4">
        <Link
          href="/dashboard/campaigns"
          className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronLeft className="h-3 w-3" /> Campaigns
        </Link>
        <div>
          <p className="ops-label mb-1">Deploy / New unit</p>
          <h1 className="font-display text-3xl font-black uppercase tracking-tight sm:text-4xl">
            New Campaign
          </h1>
        </div>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Identity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <label className="ops-label">Title *</label>
            <Input
              placeholder="e.g. XPOSED [CLIPPING]"
              value={form.title}
              onChange={set('title')}
            />
          </div>
          <div className="space-y-1.5">
            <label className="ops-label">Description / requirements *</label>
            <textarea
              rows={5}
              placeholder={'✅ Allowed: clips from the content folder\n👇 Requirements: watermark + 7s minimum'}
              value={form.description}
              onChange={set('description')}
              className="w-full border border-input bg-secondary/40 px-3 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:border-primary/60 focus-visible:ring-1 focus-visible:ring-primary/30 transition-colors"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="ops-label">Image URL</label>
              <Input placeholder="https://…" value={form.image} onChange={set('image')} />
            </div>
            <div className="space-y-1.5">
              <label className="ops-label">Type</label>
              <div className="flex flex-wrap gap-1">
                {TYPES.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, type: t }))}
                    className={cn(
                      'border px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest transition-colors',
                      form.type === t
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border text-muted-foreground hover:text-foreground',
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="ops-label">Platforms *</label>
            <div className="flex flex-wrap gap-1">
              {PLATFORMS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => togglePlatform(p)}
                  className={cn(
                    'border px-2.5 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest transition-colors',
                    form.platforms.includes(p)
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border text-muted-foreground hover:text-foreground',
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Economics</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label className="ops-label">Rate ($ per 1K views) *</label>
            <Input type="number" step="0.05" min="0" value={form.payRate} onChange={set('payRate')} />
          </div>
          <div className="space-y-1.5">
            <label className="ops-label">Budget ($) *</label>
            <Input type="number" min="0" value={form.budget} onChange={set('budget')} />
          </div>
          <div className="space-y-1.5">
            <label className="ops-label">End date *</label>
            <Input type="date" value={form.endDate} onChange={set('endDate')} />
          </div>
          <div className="space-y-1.5">
            <label className="ops-label">Minimum post date</label>
            <Input type="date" value={form.minimumPostDate} onChange={set('minimumPostDate')} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Validation Thresholds</CardTitle>
          <p className="font-mono text-[11px] text-muted-foreground">
            Leave blank to skip a rule — the clip pipeline only enforces what you set.
          </p>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ['minimumViewsForApproval', 'Views to approve'],
              ['minimumViewsForEarnings', 'Views to start earning'],
              ['minimumEngagementPercent', 'Min engagement %'],
              ['maxSubmissionsPerAccount', 'Max subs / account'],
              ['maxEarningsPerSubmission', 'Earnings cap / submission ($)'],
              ['maxEarningsPerUser', 'Earnings cap / user ($)'],
            ] as [keyof FormState, string][]
          ).map(([field, label]) => (
            <div key={field} className="space-y-1.5">
              <label className="ops-label">{label}</label>
              <Input
                type="number"
                min="0"
                step="any"
                placeholder="—"
                value={form[field] as string}
                onChange={set(field)}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3 pb-8">
        <Button variant="outline" onClick={() => router.push('/dashboard/campaigns')}>
          Cancel
        </Button>
        <Button
          size="lg"
          disabled={createMutation.isPending}
          onClick={() => createMutation.mutate()}
        >
          {createMutation.isPending ? <Loader2 className="animate-spin" /> : <Rocket />}
          Launch Campaign
        </Button>
      </div>
    </div>
  );
}
