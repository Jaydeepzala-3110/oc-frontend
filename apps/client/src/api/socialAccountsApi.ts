const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export enum SocialPlatform {
    INSTAGRAM = 'INSTAGRAM',
    TIKTOK = 'TIKTOK',
    YOUTUBE = 'YOUTUBE',
    TWITTER = 'TWITTER',
    FACEBOOK = 'FACEBOOK',
}

export interface SocialAccount {
    id: number;
    platform: SocialPlatform;
    username: string;
    avatarUrl?: string;
    isVerified: boolean;
    verifiedAt?: string;
    verificationCode: string;
    instagramConnected?: boolean;
}

export function getInstagramConnectUrl(userId: number): string {
    return `${API_BASE_URL}/auth/instagram?userId=${userId}`;
}

export const socialAccountsApi = {
    initVerification: async (username: string, platform: SocialPlatform = SocialPlatform.INSTAGRAM) => {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${API_BASE_URL}/social-accounts/init`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ username, platform }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to initiate verification');
        }

        return response.json();
    },

    verifyAccount: async (accountId: number, code: string) => {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${API_BASE_URL}/social-accounts/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ accountId, code }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to verify account');
        }

        return response.json();
    },

    getAccounts: async (): Promise<SocialAccount[]> => {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${API_BASE_URL}/social-accounts`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch accounts');
        }

        return response.json();
    },

    removeAccount: async (accountId: number) => {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${API_BASE_URL}/social-accounts/${accountId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to remove account');
        }
        return response.json();
    }
};
