"use client";

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CampaignCard } from '@/components/campaigns/CampaignCard';
import { authStorage } from '@/lib/auth';
import { toast } from 'sonner';
import { Loader2, AlertCircle } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ;

interface Campaign {
    id: number;
    title: string;
    description: string;
    image?: string;
    budget: number;
    payRate: number;
    payUnit: string;
    startDate: string;
    endDate: string;
    platforms: string[];
    status: string;
    isJoined?: boolean;
}

export default function CampaignsPage() {
    const queryClient = useQueryClient();
    const [joiningId, setJoiningId] = useState<number | null>(null);

    // Fetch campaigns
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

    // Join mutation
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

    const activeCampaigns = campaigns?.filter(c => c.status === 'ACTIVE') || [];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-2">
                    Available Campaigns
                </h1>
                <p className="text-muted-foreground text-lg">
                    Explore and join the best campaigns that match your niche.
                </p>
            </div>

            {activeCampaigns.length === 0 ? (
                <div className="text-center py-20 bg-card/50 rounded-2xl border border-border border-dashed">
                    <p className="text-xl text-muted-foreground">No active campaigns available at the moment.</p>
                    <p className="text-sm text-muted-foreground mt-2">Check back later for new opportunities!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeCampaigns.map((campaign) => (
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
        </div>
    );
}
