"use client";

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { authStorage } from '@/lib/auth';
import { toast } from 'sonner';
import {
    Loader2,
    AlertCircle,
    Calendar,
    DollarSign,
    Target,
    Users,
    CheckCircle2,
    Globe,
    Info,
    ExternalLink,
    ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
    calculateCampaignEarnings,
    formatCampaignStatus,
    formatEarningsFormula,
    formatPayRate,
    getCampaignStatusVariant,
    parseRequirementItems,
} from '@/lib/campaign-earnings';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/** Mirrors oc-backend ValidationCheck — passed: null means "verified during review". */
interface SubmissionCheck {
    id: string;
    label: string;
    passed: boolean | null;
    detail?: string;
}

interface SubmissionDetails {
    source?: string;
    username?: string;
    permalink?: string;
    mediaType?: string;
    timestamp?: string;
    rejectionCode?: string;
    rejectionReason?: string;
    checks?: SubmissionCheck[];
    metrics?: {
        views: number;
        likes: number;
        comments: number;
        shares: number;
        reach: number;
        engagementPercent: number;
    };
}

interface Campaign {
    id: number;
    title: string;
    description: string;
    image?: string;
    requirements: string;
    requirementItems?: string[];
    budget: number;
    payRate: number;
    payUnit: string;
    payRateLabel?: string;
    startDate: string;
    endDate: string;
    minimumPostDate?: string;
    campaignLink?: string;
    telegramGroupLink?: string;
    createdAt: string;
    platforms: string[];
    status: string;
    canJoin?: boolean;
    isJoined?: boolean;
    participation?: {
        id: number;
        submissionUrl?: string;
        submissionStatus?: string;
        submissionDetails?: SubmissionDetails;
        submittedAt?: string;
        views?: number;
        earnings?: number;
        projectedEarnings?: number;
        lastMetricsSync?: string;
    };
    client: {
        firstName: string;
        lastName: string;
    };
}

export default function CampaignDetailsPage() {
    const { id } = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isJoining, setIsJoining] = useState(false);

    // Submission States
    const [reelUrl, setReelUrl] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [validationStep, setValidationStep] = useState(0);

    const { data: campaign, isLoading, error } = useQuery<Campaign>({
        queryKey: ['campaign', id],
        queryFn: async () => {
            const response = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
                headers: {
                    Authorization: `Bearer ${authStorage.getAccessToken()}`,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch campaign details');
            return response.json();
        },
    });

    const joinMutation = useMutation({
        mutationFn: async () => {
            setIsJoining(true);
            const response = await fetch(`${API_BASE_URL}/campaigns/${id}/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authStorage.getAccessToken()}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to join campaign');
            }
            return response.json();
        },
        onSuccess: () => {
            toast.success('Successfully joined the campaign!');
            queryClient.invalidateQueries({ queryKey: ['campaign', id] });
            setIsJoining(false);
        },
        onError: (error: Error) => {
            toast.error(error.message);
            setIsJoining(false);
        },
    });

    const submitMutation = useMutation({
        mutationFn: async (url: string) => {
            setIsValidating(true);
            setValidationStep(1); // Starting scan...

            // Artificial steps for the "wow" factor
            await new Promise(r => setTimeout(r, 1000));
            setValidationStep(2); // AI Analyzing...
            await new Promise(r => setTimeout(r, 1000));

            const response = await fetch(`${API_BASE_URL}/campaigns/${id}/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authStorage.getAccessToken()}`,
                },
                body: JSON.stringify({ url }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Validation failed');
            }
            return response.json();
        },
        onSuccess: (data: { submissionStatus?: string; submissionDetails?: SubmissionDetails }) => {
            setValidationStep(3); // Result ready
            setTimeout(() => {
                if (data.submissionStatus === 'VERIFIED') {
                    toast.success('Content verified! Your views now count toward payouts.');
                } else if (data.submissionStatus === 'PENDING') {
                    toast.info('Submission accepted — it will be approved once it hits the minimum views.');
                } else {
                    toast.error(data.submissionDetails?.rejectionReason || 'Content rejected.');
                }
                queryClient.invalidateQueries({ queryKey: ['campaign', id] });
                setIsValidating(false);
                setValidationStep(0);
            }, 1000);
        },
        onError: (error: Error) => {
            toast.error(error.message);
            setIsValidating(false);
            setValidationStep(0);
        },
    });

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground animate-pulse font-medium">Loading campaign details...</p>
            </div>
        );
    }

    if (error || !campaign) {
        return (
            <div className="max-w-2xl mx-auto mt-20 text-center p-12 bg-card rounded-3xl border border-border shadow-sm">
                <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Campaign Not Found</h2>
                <p className="text-muted-foreground mb-8">The campaign you&apos;re looking for doesn&apos;t exist or you don&apos;t have access.</p>
                <Button size="lg" onClick={() => router.back()} className="rounded-xl">Go Back</Button>
            </div>
        );
    }

    const requirementItems = parseRequirementItems(
        campaign.requirements,
        campaign.requirementItems,
    );
    const payLabel = campaign.payRateLabel ?? formatPayRate(campaign.payRate, campaign.payUnit);
    const canJoin = campaign.canJoin ?? campaign.status === 'ACTIVE';
    const submissionStatus = campaign.participation?.submissionStatus;
    const submissionDetails = campaign.participation?.submissionDetails;
    const participationViews = campaign.participation?.views ?? 0;
    const participationEarnings = campaign.participation?.projectedEarnings
        ?? campaign.participation?.earnings
        ?? calculateCampaignEarnings(participationViews, campaign.payRate, campaign.payUnit);
    const exampleEarnings = formatEarningsFormula(campaign.payRate, campaign.payUnit, 300_000);

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Breadcrumbs / Back button */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/dashboard/campaigns" className="hover:text-foreground transition-colors">Campaigns</Link>
                <ChevronRight className="h-4 w-4" />
                <span className="text-foreground font-medium truncate max-w-[200px]">{campaign.title}</span>
            </nav>

            {/* Hero Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-8 py-4">
                <div className="space-y-6 max-w-4xl">
                    <div className="flex flex-wrap gap-3">
                        {campaign.platforms.map(p => (
                            <Badge key={p} variant="secondary" className="px-4 py-1.5 text-[10px] font-black tracking-[0.2em] uppercase bg-primary/10 text-primary border-none rounded-full">
                                {p}
                            </Badge>
                        ))}
                        <Badge variant={getCampaignStatusVariant(campaign.status)} className="px-4 py-1.5 text-[10px] font-black border-border uppercase tracking-[0.2em] rounded-full capitalize">
                            {formatCampaignStatus(campaign.status)}
                        </Badge>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-foreground tracking-tight leading-[0.9] lg:max-w-[15ch]">
                        <span className="bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/50">
                            {campaign.title}
                        </span>
                    </h1>
                    <div className="flex items-center gap-4 text-muted-foreground p-1 pr-6 rounded-full border border-border/40 w-fit bg-card/50 backdrop-blur-sm shadow-sm group hover:border-primary/20 transition-all">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 overflow-hidden group-hover:bg-primary/20 transition-colors">
                            <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-sm font-black text-foreground tracking-tight">{campaign.client.firstName} {campaign.client.lastName}</p>
                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-60">Verified Admin</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start relative">
                {/* Left Column: Content */}
                <div className="lg:col-span-2 space-y-12">
                    {campaign.image && (
                        <div className="relative group overflow-hidden rounded-[2.5rem] border border-border shadow-2xl transition-transform duration-500">
                            <img
                                src={campaign.image}
                                alt={campaign.title}
                                className="w-full aspect-[16/9] object-cover group-hover:scale-[1.02] transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                        </div>
                    )}

                    <div className="space-y-12">
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 text-primary">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Info className="h-5 w-5" />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight text-foreground">About this campaign</h2>
                            </div>
                            <div className="relative p-10 rounded-[3rem] bg-card border border-border shadow-sm group hover:shadow-md transition-all">
                                <p className="text-xl text-muted-foreground leading-relaxed whitespace-pre-wrap font-medium">
                                    {campaign.description}
                                </p>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <div className="flex items-center gap-3 text-primary">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Target className="h-5 w-5" />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight text-foreground">Requirements</h2>
                            </div>

                            <div className="bg-card rounded-[3rem] border border-border overflow-hidden shadow-sm">
                                <ol className="divide-y divide-border/50">
                                    {requirementItems.map((req, i) => (
                                            <li key={i} className="flex gap-8 p-8 hover:bg-muted/30 transition-all group">
                                                <div className="flex-shrink-0 h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-lg font-black text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                                    {i + 1}
                                                </div>
                                                <div className="pt-2 flex-1">
                                                    <p className="text-lg text-foreground font-semibold group-hover:text-primary transition-colors leading-snug">
                                                        {req}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                </ol>
                            </div>
                        </section>

                        {campaign.participation?.submissionStatus === 'VERIFIED' && (
                            <section className="space-y-6 animate-in slide-in-from-left duration-700">
                                <div className="flex items-center gap-3 text-primary">
                                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                        <Target className="h-5 w-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <h2 className="text-2xl font-bold tracking-tight text-foreground">My Performance</h2>
                                        <p className="text-xs text-muted-foreground font-medium">Real-time sync from Instagram</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="p-8 rounded-[2.5rem] bg-card border border-border shadow-sm group hover:border-primary/20 transition-all">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Total Views</p>
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary">
                                                <Users className="h-6 w-6" />
                                            </div>
                                            <h3 className="text-4xl font-black tracking-tighter">{(campaign.participation.views || 0).toLocaleString('en-US')}</h3>
                                        </div>
                                    </div>

                                    <div className="p-8 rounded-[2.5rem] bg-card border border-border shadow-sm group hover:border-primary/20 transition-all">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-4">Accumulated Earnings</p>
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 rounded-2xl bg-green-500/5 flex items-center justify-center text-green-600">
                                                <DollarSign className="h-6 w-6" />
                                            </div>
                                            <h3 className="text-4xl font-black tracking-tighter text-green-600">${participationEarnings.toFixed(2)}</h3>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-4 font-medium">
                                            {formatEarningsFormula(campaign.payRate, campaign.payUnit, participationViews)}
                                        </p>
                                    </div>

                                    <div className="p-8 rounded-[2.5rem] bg-card border border-border shadow-sm flex flex-col justify-center">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Last Synced</p>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                            <span className="text-sm font-bold text-foreground">
                                                {campaign.participation.lastMetricsSync
                                                    ? new Date(campaign.participation.lastMetricsSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                                    : 'Syncing...'}
                                            </span>
                                        </div>
                                        <p className="text-[10px] font-medium text-muted-foreground mt-1 uppercase tracking-tighter opacity-70">Updates every hour</p>
                                    </div>
                                </div>
                            </section>
                        )}

                        <section className="space-y-6">
                            <div className="flex items-center gap-3 text-primary">
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Globe className="h-5 w-5" />
                                </div>
                                <div className="space-y-1">
                                    <h2 className="text-2xl font-bold tracking-tight text-foreground">Submit Your Content</h2>
                                    <p className="text-xs text-muted-foreground font-medium">Automated AI rule verification for Instagram Reels</p>
                                </div>
                            </div>

                            {campaign.isJoined ? (
                                <div className="bg-card rounded-[3rem] border border-border overflow-hidden shadow-2xl p-8 space-y-8">
                                    {(!campaign.participation?.submissionStatus || campaign.participation?.submissionStatus === 'REJECTED') && !isValidating ? (
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-black uppercase tracking-widest text-muted-foreground ml-2">Instagram Reel URL</label>
                                                <div className="flex gap-4">
                                                    <input
                                                        type="text"
                                                        placeholder="https://www.instagram.com/reel/..."
                                                        className="flex-1 h-16 rounded-2xl bg-muted/30 border border-border px-6 font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-foreground"
                                                        value={reelUrl}
                                                        onChange={(e) => setReelUrl(e.target.value)}
                                                    />
                                                    <Button
                                                        size="lg"
                                                        className="h-16 px-10 rounded-2xl font-black shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground transition-all active:scale-95"
                                                        onClick={() => submitMutation.mutate(reelUrl)}
                                                        disabled={!reelUrl || submitMutation.isPending}
                                                    >
                                                        {submitMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : 'VERIFY & SUBMIT'}
                                                    </Button>
                                                </div>
                                            </div>

                                            {submissionStatus === 'REJECTED' && (
                                                <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20 flex gap-4 items-center animate-in shake duration-500">
                                                    <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0" />
                                                    <div className="space-y-1">
                                                        <p className="text-sm font-bold text-destructive">
                                                            Submission Rejected
                                                            {submissionDetails?.rejectionCode && (
                                                                <span className="ml-2 text-[10px] font-black uppercase tracking-widest opacity-60">{submissionDetails.rejectionCode.replaceAll('_', ' ')}</span>
                                                            )}
                                                        </p>
                                                        <p className="text-xs text-destructive/70 font-medium">{submissionDetails?.rejectionReason ?? 'Your reel did not pass campaign validation.'}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : isValidating ? (
                                        <div className="py-12 flex flex-col items-center justify-center space-y-6 text-center">
                                            <div className="relative h-24 w-24">
                                                <div className="absolute inset-0 rounded-full border-4 border-primary/10" />
                                                <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Globe className="h-8 w-8 text-primary animate-pulse" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-xl font-black animate-pulse">
                                                    {validationStep === 1 ? "VERIFYING REEL OWNERSHIP..." :
                                                        validationStep === 2 ? "CHECKING CAMPAIGN RULES..." :
                                                            "FINALIZING RESULTS..."}
                                                </p>
                                                <p className="text-sm text-muted-foreground font-medium">Validating against {campaign.title} requirements</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                                            <div className={cn(
                                                "p-8 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-6",
                                                submissionStatus === 'VERIFIED' && "bg-green-500/10 border border-green-500/20",
                                                submissionStatus === 'PENDING' && "bg-amber-500/10 border border-amber-500/20",
                                                submissionStatus === 'REJECTED' && "bg-destructive/10 border border-destructive/20"
                                            )}>
                                                <div className="flex items-center gap-6">
                                                    <div className={cn(
                                                        "h-16 w-16 rounded-2xl flex items-center justify-center",
                                                        submissionStatus === 'VERIFIED' && "bg-green-500/20 text-green-600",
                                                        submissionStatus === 'PENDING' && "bg-amber-500/20 text-amber-600",
                                                        submissionStatus === 'REJECTED' && "bg-destructive/20 text-destructive"
                                                    )}>
                                                        {submissionStatus === 'VERIFIED' ? <CheckCircle2 className="h-8 w-8" />
                                                            : submissionStatus === 'PENDING' ? <Loader2 className="h-8 w-8 animate-spin" />
                                                                : <AlertCircle className="h-8 w-8" />}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-bold">
                                                            {submissionStatus === 'VERIFIED' ? 'Verification Passed'
                                                                : submissionStatus === 'PENDING' ? 'Pending Approval'
                                                                    : 'Verification Failed'}
                                                        </h4>
                                                        <p className="text-sm font-medium opacity-70">
                                                            {submissionStatus === 'PENDING'
                                                                ? 'Valid reel — approval unlocks automatically when it reaches the minimum views. Synced hourly.'
                                                                : submissionStatus === 'REJECTED' && submissionDetails?.rejectionReason
                                                                    ? submissionDetails.rejectionReason
                                                                    : `Submitted on ${new Date(campaign.participation?.submittedAt || '').toLocaleDateString()}`}
                                                        </p>
                                                    </div>
                                                </div>
                                                {submissionStatus === 'VERIFIED' && (
                                                    <Badge className="bg-green-600 text-white font-black px-6 py-2 rounded-full border-none">ACTIVE FOR PAYOUTS</Badge>
                                                )}
                                                {submissionStatus === 'PENDING' && (
                                                    <Badge className="bg-amber-500 text-white font-black px-6 py-2 rounded-full border-none">GATHERING VIEWS</Badge>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {submissionDetails?.checks?.map((check, i) => (
                                                    <div key={check.id ?? i} className="flex items-center justify-between gap-4 p-5 rounded-2xl border border-border bg-muted/10 group transition-all hover:bg-muted/20">
                                                        <div className="flex items-center gap-3 min-w-0">
                                                            <div className={cn(
                                                                "h-2 w-2 rounded-full flex-shrink-0",
                                                                check.passed === true && "bg-green-500",
                                                                check.passed === false && "bg-destructive",
                                                                check.passed === null && "bg-amber-500"
                                                            )} />
                                                            <div className="min-w-0">
                                                                <p className="text-sm font-bold text-foreground/80 group-hover:text-foreground truncate">{check.label}</p>
                                                                {check.detail && (
                                                                    <p className="text-[11px] font-medium text-muted-foreground truncate">{check.detail}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                        {check.passed === true ? (
                                                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                        ) : check.passed === false ? (
                                                            <div className="flex items-center gap-2 text-destructive flex-shrink-0">
                                                                <span className="text-[10px] font-black uppercase">Failed</span>
                                                                <AlertCircle className="h-4 w-4" />
                                                            </div>
                                                        ) : (
                                                            <span className="text-[10px] font-black uppercase text-amber-600 flex-shrink-0">In Review</span>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>

                                            {submissionDetails?.metrics && submissionStatus !== 'REJECTED' && (
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                    {([
                                                        ['Views', submissionDetails.metrics.views],
                                                        ['Likes', submissionDetails.metrics.likes],
                                                        ['Comments', submissionDetails.metrics.comments],
                                                        ['Engagement', `${submissionDetails.metrics.engagementPercent}%`],
                                                    ] as const).map(([label, value]) => (
                                                        <div key={label} className="p-4 rounded-2xl bg-muted/20 border border-border/50 text-center">
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</p>
                                                            <p className="text-lg font-black">{typeof value === 'number' ? value.toLocaleString('en-US') : value}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {submissionStatus === 'REJECTED' && (
                                                <div className="flex justify-center">
                                                    <Button variant="outline" className="rounded-2xl border-dashed border-2 px-10 py-6 h-auto font-black text-sm uppercase tracking-widest hover:bg-muted/50 transition-all" onClick={() => {
                                                        setReelUrl('');
                                                        // Reset status locally to allow re-submission UI
                                                        campaign.participation!.submissionStatus = undefined;
                                                        queryClient.invalidateQueries({ queryKey: ['campaign', id] });
                                                    }}>
                                                        TRY ANOTHER REEL
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="p-10 rounded-[3rem] border border-dashed border-border bg-muted/5 text-center space-y-4">
                                    <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                                        <Target className="h-8 w-8 text-muted-foreground/50" />
                                    </div>
                                    <h3 className="text-xl font-bold">Ready to submit?</h3>
                                    <p className="text-muted-foreground max-w-sm mx-auto font-medium leading-relaxed">
                                        Join this campaign first to unlock the AI verification portal and start earning.
                                    </p>
                                </div>
                            )}
                        </section>
                    </div>
                </div>

                {/* Right Column: Sticky Stats & Actions */}
                <aside className="lg:sticky lg:top-8 space-y-6">
                    <Card className="rounded-[2.5rem] border-border shadow-2xl overflow-hidden bg-card/80 backdrop-blur-xl border-primary/5">
                        <CardHeader className="p-8 pb-4">
                            <CardTitle className="text-xl font-bold tracking-tight flex items-center gap-2">
                                Offer Overview
                                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 pt-0 space-y-8">
                            {/* Payout Metric */}
                            <div className="p-8 rounded-[2rem] bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-xl shadow-primary/20 relative overflow-hidden group">
                                <div className="absolute -right-4 -top-4 h-24 w-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mb-3">Pay Rate</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-black tracking-tighter">{payLabel}</span>
                                </div>
                                <p className="text-xs font-bold opacity-90 mt-4 uppercase tracking-widest">Example: {exampleEarnings}</p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50">
                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">Status</p>
                                    <Badge variant={getCampaignStatusVariant(campaign.status)} className="capitalize">
                                        {formatCampaignStatus(campaign.status)}
                                    </Badge>
                                </div>
                                {campaign.minimumPostDate && (
                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50">
                                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">Minimum Post Date</p>
                                        <p className="text-sm font-bold">{new Date(campaign.minimumPostDate).toLocaleDateString()}</p>
                                    </div>
                                )}
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/50">
                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">Created At</p>
                                    <p className="text-sm font-bold">{new Date(campaign.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>

                            {/* Grid Metrics */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-5 rounded-2xl bg-muted/30 border border-border/50 space-y-1 hover:bg-muted/50 transition-colors">
                                    <Globe className="h-4 w-4 text-primary mb-2" />
                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">Platform</p>
                                    <p className="text-base font-bold truncate">{campaign.platforms[0] || 'Social'}</p>
                                </div>
                                <div className="p-5 rounded-2xl bg-muted/30 border border-border/50 space-y-1 hover:bg-muted/50 transition-colors">
                                    <DollarSign className="h-4 w-4 text-primary mb-2" />
                                    <p className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">Budget</p>
                                    <p className="text-base font-bold">${campaign.budget.toLocaleString('en-US')}</p>
                                </div>
                            </div>

                            {/* Deadline */}
                            <div className="flex items-center gap-4 p-5 rounded-2xl border border-dashed border-primary/20 bg-primary/5">
                                <div className="h-10 w-10 rounded-xl bg-background border border-border flex items-center justify-center">
                                    <Calendar className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Deadline</p>
                                    <p className="text-sm font-bold">{new Date(campaign.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-2">
                                {campaign.campaignLink && (
                                    <Button asChild variant="outline" className="w-full h-14 rounded-[1.25rem] font-bold">
                                        <a href={campaign.campaignLink} target="_blank" rel="noopener noreferrer">
                                            Visit Campaign
                                            <ExternalLink className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                )}
                                {campaign.telegramGroupLink && (
                                    <Button asChild variant="outline" className="w-full h-14 rounded-[1.25rem] font-bold">
                                        <a href={campaign.telegramGroupLink} target="_blank" rel="noopener noreferrer">
                                            Join Telegram Group
                                            <ExternalLink className="ml-2 h-4 w-4" />
                                        </a>
                                    </Button>
                                )}
                                <Button
                                    className={cn(
                                        "w-full h-16 rounded-[1.5rem] text-lg font-black transition-all shadow-xl tracking-tight",
                                        canJoin && !campaign.isJoined && "shadow-primary/30 hover:scale-[1.02] hover:shadow-2xl bg-primary hover:bg-primary/90"
                                    )}
                                    onClick={() => joinMutation.mutate()}
                                    disabled={isJoining || campaign.isJoined || !canJoin}
                                    variant={campaign.isJoined ? "outline" : canJoin ? "default" : "secondary"}
                                >
                                    {isJoining ? (
                                        <>
                                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                            SUBMITTING...
                                        </>
                                    ) : campaign.isJoined ? (
                                        <>
                                            <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
                                            JOINED
                                        </>
                                    ) : canJoin ? (
                                        <>
                                            JOIN CAMPAIGN
                                            <ExternalLink className="ml-2 h-4 w-4" />
                                        </>
                                    ) : (
                                        <>NOT OPEN TO JOIN</>
                                    )}
                                </Button>
                                {!canJoin && !campaign.isJoined && (
                                    <p className="text-center text-[10px] text-muted-foreground px-6 leading-relaxed font-bold uppercase tracking-tighter opacity-70">
                                        Only active campaigns accept new clippers.
                                    </p>
                                )}
                                {canJoin && (
                                    <p className="text-center text-[10px] text-muted-foreground px-6 leading-relaxed font-bold uppercase tracking-tighter opacity-70">
                                        Secure your spot by applying early. Terms apply.
                                    </p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
