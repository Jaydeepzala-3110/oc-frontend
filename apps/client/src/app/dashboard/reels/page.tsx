"use client";

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reelsApi } from '@/api/reelsApi';
import { authStorage } from '@/lib/auth';
import { toast } from 'sonner';
import { Loader2, Upload, Plus, Trash2, Video } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Campaign {
    id: number;
    title: string;
    isJoined?: boolean;
}

export default function ReelsPage() {
    const queryClient = useQueryClient();
    const [uploadMode, setUploadMode] = useState<'single' | 'bulk'>('single');
    const [selectedCampaignId, setSelectedCampaignId] = useState<string>('');
    const [urls, setUrls] = useState<string[]>(['']);

    // Fetch user's joined campaigns
    const { data: campaigns, isLoading: isLoadingCampaigns } = useQuery<Campaign[]>({
        queryKey: ['my-campaigns'],
        queryFn: async () => {
            const response = await fetch(`${API_BASE_URL}/campaigns`, { // Assuming /campaigns currently returns all, but we filter or new endpoint needed? 
                // The prompt implies "all the camign which user has registered". 
                // Existing /campaigns endpoint takes userId and returns isJoined. 
                // We can filter on client side for now.
                headers: {
                    Authorization: `Bearer ${authStorage.getAccessToken()}`,
                },
            });
            if (!response.ok) throw new Error('Failed to fetch campaigns');
            const data = await response.json();
            return data.filter((c: Campaign) => c.isJoined);
        },
    });

    // Fetch current reels
    const { data: reels, isLoading: isLoadingReels } = useQuery({
        queryKey: ['reels'],
        queryFn: reelsApi.getUserReels,
    });

    const createReelsMutation = useMutation({
        mutationFn: reelsApi.createReels,
        onSuccess: (data) => {
            toast.success(`Successfully uploaded ${data.count} reel(s)!`);
            setUrls(['']);
            setSelectedCampaignId('');
            queryClient.invalidateQueries({ queryKey: ['reels'] });
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const handleUrlChange = (index: number, value: string) => {
        const newUrls = [...urls];
        newUrls[index] = value;
        setUrls(newUrls);
    };

    const addUrlField = () => {
        setUrls([...urls, '']);
    };

    const removeUrlField = (index: number) => {
        const newUrls = urls.filter((_, i) => i !== index);
        setUrls(newUrls);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validUrls = urls.filter(u => u.trim() !== '');

        if (validUrls.length === 0) {
            toast.error('Please enter at least one URL');
            return;
        }

        if (!selectedCampaignId) {
            toast.error('Please select a campaign');
            return;
        }

        createReelsMutation.mutate({
            urls: validUrls,
            campaignId: parseInt(selectedCampaignId),
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-2">
                    My Reels
                </h1>
                <p className="text-muted-foreground text-lg">
                    Upload and manage your reel submissions for active campaigns.
                </p>
            </div>

            {/* Upload Section */}
            <div className="bg-card border rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold flex items-center gap-2">
                        <Upload className="h-5 w-5 text-primary" />
                        Upload Reels
                    </h2>
                    <div className="flex bg-muted p-1 rounded-lg">
                        <button
                            onClick={() => {
                                setUploadMode('single');
                                setUrls(['']);
                            }}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${uploadMode === 'single'
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Single Upload
                        </button>
                        <button
                            onClick={() => {
                                setUploadMode('bulk');
                                setUrls(['']);
                            }}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${uploadMode === 'bulk'
                                    ? 'bg-background text-foreground shadow-sm'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Bulk Upload
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Select Campaign
                        </label>
                        <select
                            value={selectedCampaignId}
                            onChange={(e) => setSelectedCampaignId(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={isLoadingCampaigns}
                        >
                            <option value="">Select a campaign...</option>
                            {campaigns?.map((campaign) => (
                                <option key={campaign.id} value={campaign.id}>
                                    {campaign.title}
                                </option>
                            ))}
                        </select>
                        {isLoadingCampaigns && <p className="text-xs text-muted-foreground">Loading campaigns...</p>}
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-medium leading-none">
                            Reel URL{uploadMode === 'bulk' ? 's' : ''}
                        </label>
                        {urls.map((url, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="url"
                                    placeholder="https://instagram.com/reel/..."
                                    value={url}
                                    onChange={(e) => handleUrlChange(index, e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                {uploadMode === 'bulk' && urls.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeUrlField(index)}
                                        className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        ))}

                        {uploadMode === 'bulk' && (
                            <button
                                type="button"
                                onClick={addUrlField}
                                className="flex items-center gap-2 text-sm text-primary hover:underline"
                            >
                                <Plus className="h-4 w-4" />
                                Add another URL
                            </button>
                        )}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={createReelsMutation.isPending || !selectedCampaignId}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                        >
                            {createReelsMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Submit {uploadMode === 'single' ? 'Reel' : 'Reels'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Reels List */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Your Submissions</h2>
                {isLoadingReels ? (
                    <div className="flex justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : reels && reels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {reels.map((reel) => (
                            <div key={reel.id} className="group relative bg-card border rounded-xl overflow-hidden hover:shadow-md transition-all">
                                <div className="p-4 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1">
                                            <p className="font-semibold text-sm line-clamp-1">
                                                {reel.participation?.campaign?.title || 'Unknown Campaign'}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Submitted {new Date(reel.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${reel.status === 'VERIFIED' ? 'bg-green-500/10 text-green-500' :
                                                reel.status === 'REJECTED' ? 'bg-red-500/10 text-red-500' :
                                                    'bg-yellow-500/10 text-yellow-500'
                                            }`}>
                                            {reel.status}
                                        </span>
                                    </div>
                                    <div className="pt-2">
                                        <a
                                            href={reel.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                                        >
                                            <Video className="h-4 w-4" />
                                            View Reel
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
                        <p className="text-muted-foreground">No reels submitted yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
