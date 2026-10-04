"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { socialAccountsApi, SocialPlatform, SocialAccount, getInstagramConnectUrl } from '@/api/socialAccountsApi';
import { authStorage } from '@/lib/auth';
import { toast } from 'sonner';
import {
    Loader2,
    Instagram,
    CheckCircle2,
    Copy,
    Trash2,
    Plus,
    ShieldCheck,
    AlertCircle,
    ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { parseInstagramUsername } from '@/lib/instagram';
import {
    PendingAccountVerify,
    type VerifyUiStatus,
} from '@/components/social-accounts/PendingAccountVerify';
import { SocialAccountAvatar } from '@/components/social-accounts/SocialAccountAvatar';

export default function SocialAccountsPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        }>
            <SocialAccountsContent />
        </Suspense>
    );
}

function SocialAccountsContent() {
    const queryClient = useQueryClient();
    const searchParams = useSearchParams();
    const [isAdding, setIsAdding] = useState(false);
    const [username, setUsername] = useState('');
    const [verificationStep, setVerificationStep] = useState<'IDLE' | 'CODE_GENERATED'>('IDLE');
    const [verificationData, setVerificationData] = useState<{
        code: string;
        accountId: number;
        username?: string;
    } | null>(null);
    const [verifyingAccountId, setVerifyingAccountId] = useState<number | null>(null);
    const [verifyUiByAccount, setVerifyUiByAccount] = useState<
        Record<number, VerifyUiStatus>
    >({});

    // Fetch Accounts
    const { data: accounts, isLoading } = useQuery({
        queryKey: ['social-accounts'],
        queryFn: socialAccountsApi.getAccounts,
    });

    // Init Verification Mutation
    const parsedUsername = parseInstagramUsername(username);

    const initMutation = useMutation({
        mutationFn: async () => {
            const handle = parseInstagramUsername(username);
            if (!handle) {
                throw new Error(
                    'Enter a valid Instagram username (without @).',
                );
            }
            return socialAccountsApi.initVerification(handle, SocialPlatform.INSTAGRAM);
        },
        onSuccess: (data) => {
            const code = data.code ?? data.verificationCode;
            if (!code || !data.accountId) {
                toast.error('Invalid response from server. Please try again.');
                return;
            }
            setVerificationData({
                code,
                accountId: data.accountId,
                username: data.username,
            });
            setVerificationStep('CODE_GENERATED');
            setVerifyUiByAccount((prev) => ({
                ...prev,
                [data.accountId]: 'idle',
            }));
            toast.success('Verification code generated!');
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const verifyMutation = useMutation({
        mutationFn: async ({
            accountId,
            code,
        }: {
            accountId: number;
            code: string;
        }) => {
            return socialAccountsApi.verifyAccount(accountId, code);
        },
        onSuccess: (_data, variables) => {
            setVerifyUiByAccount((prev) => ({
                ...prev,
                [variables.accountId]: 'success',
            }));
            toast.success('Account verified successfully!');
            setTimeout(() => {
                setIsAdding(false);
                setVerificationStep('IDLE');
                setUsername('');
                setVerificationData(null);
                setVerifyingAccountId(null);
                queryClient.invalidateQueries({ queryKey: ['social-accounts'] });
            }, 1500);
        },
        onError: (_error, variables) => {
            setVerifyUiByAccount((prev) => ({
                ...prev,
                [variables.accountId]: 'error',
            }));
        },
        onSettled: () => {
            setVerifyingAccountId(null);
        },
    });

    const handleVerify = (accountId: number, code: string) => {
        setVerifyingAccountId(accountId);
        setVerifyUiByAccount((prev) => ({
            ...prev,
            [accountId]: 'loading',
        }));
        verifyMutation.mutate({ accountId, code });
    };

    const getVerifyStatus = (accountId: number): VerifyUiStatus => {
        if (verifyingAccountId === accountId && verifyMutation.isPending) {
            return 'loading';
        }
        return verifyUiByAccount[accountId] ?? 'idle';
    };

    const clearVerifyError = (accountId: number) => {
        setVerifyUiByAccount((prev) => {
            if (prev[accountId] !== 'error') return prev;
            return { ...prev, [accountId]: 'idle' };
        });
    };

    // Remove Account Mutation
    const removeMutation = useMutation({
        mutationFn: socialAccountsApi.removeAccount,
        onSuccess: () => {
            toast.success('Account removed.');
            queryClient.invalidateQueries({ queryKey: ['social-accounts'] });
        },
        onError: (error: Error) => {
            toast.error(error.message);
        },
    });

    const copyToClipboard = () => {
        if (verificationData?.code) {
            navigator.clipboard.writeText(verificationData.code);
            toast.success('Code copied to clipboard');
        }
    };

    const handleConnectInstagram = () => {
        const userId = authStorage.getUserIdFromToken();
        if (!userId) {
            toast.error('Please sign in first');
            return;
        }
        window.location.href = getInstagramConnectUrl(userId);
    };

    useEffect(() => {
        if (searchParams.get('connected') === '1') {
            const username = searchParams.get('username');
            toast.success(
                username
                    ? `Instagram @${username} connected successfully!`
                    : 'Instagram connected successfully!',
            );
            queryClient.invalidateQueries({ queryKey: ['social-accounts'] });
            window.history.replaceState({}, '', '/dashboard/social-accounts');
        }
    }, [searchParams, queryClient]);

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-foreground mb-2">
                        Social Connect
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Manage your connected social profiles and verification status.
                    </p>
                </div>
                {!isAdding && (
                    <div className="flex flex-wrap gap-3">
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={handleConnectInstagram}
                            className="rounded-full px-8 font-bold"
                        >
                            <Instagram className="mr-2 h-5 w-5 text-pink-500" />
                            Connect with Instagram
                        </Button>
                        <Button
                            size="lg"
                            onClick={() => setIsAdding(true)}
                            className="rounded-full px-8 font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                        >
                            <Plus className="mr-2 h-5 w-5" />
                            Verify via Bio Code
                        </Button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Add Account Flow */}
                    {isAdding && (
                        <div className="rounded-[2rem] border border-border bg-card p-1 shadow-2xl animate-in zoom-in-95 duration-300">
                            <div className="rounded-[1.75rem] border border-border/50 bg-background/50 p-8 backdrop-blur-sm">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold flex items-center gap-2">
                                            <Instagram className="h-6 w-6 text-pink-500" />
                                            Connect Instagram
                                        </h2>
                                        <p className="text-muted-foreground mt-1">Verify ownership of your Instagram profile.</p>
                                    </div>
                                    <Button variant="ghost" size="sm" onClick={() => {
                                        setIsAdding(false);
                                        setVerificationStep('IDLE');
                                        setUsername('');
                                    }}>
                                        Cancel
                                    </Button>
                                </div>

                                {verificationStep === 'IDLE' ? (
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground ml-1">
                                                Instagram username
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">@</span>
                                                <Input
                                                    placeholder="alexfury77"
                                                    className="pl-8 h-12 rounded-xl text-lg font-medium"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                            </div>
                                            {username.trim() && !parsedUsername && (
                                                <p className="text-xs text-destructive ml-1">
                                                    Enter a valid username (letters, numbers, dots, underscores only).
                                                </p>
                                            )}
                                        </div>
                                        <Button
                                            size="lg"
                                            className="w-full rounded-xl h-12 font-bold"
                                            onClick={() => initMutation.mutate()}
                                            disabled={!parsedUsername || initMutation.isPending}
                                        >
                                            {initMutation.isPending && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                                            Generate Verification Code
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        <div className="p-6 bg-primary/5 border border-primary/10 rounded-2xl space-y-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">1</div>
                                                <p className="font-medium">Copy this unique code</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <code className="flex-1 bg-background border border-border p-4 rounded-xl text-center font-mono text-lg font-bold tracking-wider text-primary">
                                                    {verificationData?.code}
                                                </code>
                                                <Button size="icon" variant="outline" className="h-14 w-14 rounded-xl shrink-0" onClick={copyToClipboard}>
                                                    <Copy className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 text-muted-foreground px-2">
                                            <ArrowRight className="h-5 w-5 rotate-90 md:rotate-0" />
                                            <p className="text-sm">Paste this code into your Instagram bio temporarily.</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 px-2">
                                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">2</div>
                                                <p className="font-medium">
                                                    Verify account
                                                    {verificationData?.username && (
                                                        <span className="text-muted-foreground font-normal">
                                                            {' '}
                                                            (@{verificationData.username})
                                                        </span>
                                                    )}
                                                </p>
                                            </div>

                                            {verificationData && (
                                                <PendingAccountVerify
                                                    username={
                                                        verificationData.username ??
                                                        parseInstagramUsername(username) ??
                                                        username
                                                    }
                                                    verificationCode={verificationData.code}
                                                    status={getVerifyStatus(verificationData.accountId)}
                                                    isActive={
                                                        verifyingAccountId === verificationData.accountId
                                                    }
                                                    onClearError={() =>
                                                        clearVerifyError(verificationData.accountId)
                                                    }
                                                    onVerify={() =>
                                                        handleVerify(
                                                            verificationData.accountId,
                                                            verificationData.code,
                                                        )
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Verified Accounts List */}
                    <div className="space-y-4">
                        {isLoading ? (
                            <div className="flex justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : accounts?.length === 0 && !isAdding ? (
                            <div className="text-center py-20 rounded-[2rem] border border-dashed border-border bg-muted/5">
                                <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Instagram className="h-8 w-8 text-muted-foreground/50" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">No linked accounts</h3>
                                <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                                    Connect your Instagram account to start participating in campaigns.
                                </p>
                                <Button
                                    size="lg"
                                    onClick={handleConnectInstagram}
                                    className="rounded-full px-8 font-bold"
                                >
                                    <Instagram className="mr-2 h-5 w-5" />
                                    Connect with Instagram
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {accounts?.map((account: SocialAccount) => {
                                    const displayUsername =
                                        parseInstagramUsername(account.username) ??
                                        account.username;

                                    return (
                                    <Card key={account.id} className="rounded-2xl border-border/50 hover:border-primary/20 transition-all group overflow-hidden">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-14 w-14 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px]">
                                                        <div className="h-full w-full rounded-full bg-background overflow-hidden">
                                                            <SocialAccountAvatar
                                                                username={displayUsername}
                                                                avatarUrl={account.avatarUrl}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold flex items-center gap-2">
                                                            @{displayUsername}
                                                            {account.isVerified && <CheckCircle2 className="h-4 w-4 text-blue-500" />}
                                                        </h3>
                                                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                                            {account.platform}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 shrink-0">
                                                    {account.isVerified ? (
                                                        <Badge variant="secondary" className="bg-green-500/10 text-green-600 hover:bg-green-500/20 px-3 py-1">
                                                            {account.instagramConnected ? 'OAUTH' : 'VERIFIED'}
                                                        </Badge>
                                                    ) : (
                                                        <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20 px-3 py-1">
                                                            PENDING
                                                        </Badge>
                                                    )}
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl"
                                                        onClick={() => {
                                                            if (confirm('Are you sure you want to remove this account?')) {
                                                                removeMutation.mutate(account.id);
                                                            }
                                                        }}
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </Button>
                                                </div>
                                            </div>

                                            {!account.isVerified && account.verificationCode && (
                                                <PendingAccountVerify
                                                    username={displayUsername}
                                                    verificationCode={account.verificationCode}
                                                    status={getVerifyStatus(account.id)}
                                                    isActive={verifyingAccountId === account.id}
                                                    onClearError={() => clearVerifyError(account.id)}
                                                    onVerify={() =>
                                                        handleVerify(
                                                            account.id,
                                                            account.verificationCode,
                                                        )
                                                    }
                                                />
                                            )}
                                        </CardContent>
                                    </Card>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar / Info */}
                <div className="space-y-6">
                    <Card className="rounded-[2rem] border-border bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <ShieldCheck className="h-5 w-5 text-primary" />
                                Why Verify?
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-muted-foreground">
                            <p>
                                Verification proves you own the account linked to OnlyCreators. This is required to:
                            </p>
                            <ul className="space-y-2 list-disc pl-4 text-foreground font-medium">
                                <li>Join Campaigns</li>
                                <li>Submit Reels for payout</li>
                                <li>Access analytics tools</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <Card className="rounded-[2rem] shadow-none border-border bg-muted/5">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                                <div className="space-y-2">
                            <p className="text-sm font-semibold text-foreground">Recommended: OAuth</p>
                                    <p className="text-xs text-muted-foreground">
                                        Use <strong>Connect with Instagram</strong> for automatic verification and view tracking on campaigns. Bio-code verify is a fallback.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
