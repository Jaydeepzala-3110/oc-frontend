"use client";

import React, { useMemo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CampaignCard } from '@/components/campaigns/CampaignCard';
import { authStorage } from '@/lib/auth';
import { toast } from 'sonner';
import { Loader2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ;

interface Campaign {
    id: number;
    title: string;
    description: string;
    image?: string;
    budget: number;
    payRate: number;
    payUnit: string;
    payRateLabel?: string;
    startDate: string;
    endDate: string;
    platforms: string[];
    status: string;
    canJoin?: boolean;
    isJoined?: boolean;
}

type StatusFilter = 'ALL' | 'ACTIVE' | 'PAYMENT_PROCESSING' | 'OTHER';

export default function CampaignsPage() {
    const queryClient = useQueryClient();
    const [joiningId, setJoiningId] = useState<number | null>(null);
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

    const { data: campaigns, isLoading, error } = useQuery<Campaign[]>({
        queryKey: ['campaigns'],
        queryFn: async () => {
            const response = await fetch(`${API_BASE_URL}/campaigns`, {
                headers: {
                    Authorization: `Bearer ${authStorage.getAccessToken()}`,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch campaigns');
            return response.json();
        },
    });

    const joinMutation = useMutation({
        mutationFn: async (campaignId: number) => {
            setJoiningId(campaignId);
            const response = await fetch(`${API_BASE_URL}/campaigns/${campaignId}/join`, {
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
            queryClient.invalidateQueries({ queryKey: ['campaigns'] });
            setJoiningId(null);
        },
        onError: (error: Error) => {
            toast.error(error.message);
            setJoiningId(null);
        },
    });

    const filteredCampaigns = useMemo(() => {
        if (!campaigns) return [];

        return campaigns.filter((campaign) => {
            if (statusFilter === 'ALL') return true;
            if (statusFilter === 'ACTIVE') return campaign.status === 'ACTIVE';
            if (statusFilter === 'PAYMENT_PROCESSING') return campaign.status === 'PAYMENT_PROCESSING';
            return !['ACTIVE', 'PAYMENT_PROCESSING'].includes(campaign.status);
        });
    }, [campaigns, statusFilter]);

    const statusCounts = useMemo(() => {
        if (!campaigns) {
            return { all: 0, active: 0, paymentProcessing: 0, other: 0 };
        }

        return {
            all: campaigns.length,
            active: campaigns.filter((c) => c.status === 'ACTIVE').length,
            paymentProcessing: campaigns.filter((c) => c.status === 'PAYMENT_PROCESSING').length,
            other: campaigns.filter((c) => !['ACTIVE', 'PAYMENT_PROCESSING'].includes(c.status)).length,
        };
    }, [campaigns]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Loading campaigns...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6 bg-destructive/10 rounded-xl border border-destructive/20">
                <AlertCircle className="h-10 w-10 text-destructive mb-4" />
                <h3 className="text-xl font-semibold mb-2">Error Loading Campaigns</h3>
                <p className="text-muted-foreground mb-4">{(error as Error).message}</p>
                <button
                    onClick={() => queryClient.invalidateQueries({ queryKey: ['campaigns'] })}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                    Try Again
                </button>
            </div>
        );
    }

    const filters: { key: StatusFilter; label: string; count: number }[] = [
        { key: 'ALL', label: 'All', count: statusCounts.all },
        { key: 'ACTIVE', label: 'Active', count: statusCounts.active },
        { key: 'PAYMENT_PROCESSING', label: 'Payment Processing', count: statusCounts.paymentProcessing },
        { key: 'OTHER', label: 'Other', count: statusCounts.other },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-2">
                    Campaigns
                </h1>
                <p className="text-muted-foreground text-lg">
                    Browse every campaign and its status. Only active campaigns can be joined.
                </p>
            </div>

            <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                    <button
                        key={filter.key}
                        type="button"
                        onClick={() => setStatusFilter(filter.key)}
                        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                            statusFilter === filter.key
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border bg-card text-muted-foreground hover:text-foreground'
                        }`}
                    >
                        {filter.label}
                        <Badge variant="secondary" className="rounded-full px-2 py-0 text-[10px]">
                            {filter.count}
                        </Badge>
                    </button>
                ))}
            </div>

            {filteredCampaigns.length === 0 ? (
                <div className="text-center py-20 bg-card/50 rounded-2xl border border-border border-dashed">
                    <p className="text-xl text-muted-foreground">No campaigns match this filter.</p>
                    <p className="text-sm text-muted-foreground mt-2">Try another status or check back later.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCampaigns.map((campaign) => (
                        <CampaignCard
                            key={campaign.id}
                            campaign={campaign}
                            onJoin={(id) => joinMutation.mutate(id)}
                            isJoining={joiningId === campaign.id}
                            isJoined={campaign.isJoined}
                        />
                    ))}
                </div>
            )}

            <p className="text-sm text-muted-foreground">
                Earnings follow Clipster-style math:{' '}
                <span className="font-medium text-foreground">views × payout rate</span>{' '}
                (e.g. $1,500 / 1M views × 300k views = $450).
            </p>
        </div>
    );
}
