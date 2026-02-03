const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface CreateReelsRequest {
    urls: string[];
    campaignId: number;
}

export interface Reel {
    id: number;
    url: string;
    participationId: number;
    createdAt: string;
    updatedAt: string;
    status: string;
    participation: {
        campaign: {
            title: string;
            description: string;
            image: string | null;
        };
    };
}

export const reelsApi = {
    createReels: async (data: CreateReelsRequest): Promise<{ message: string; count: number }> => {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${API_BASE_URL}/reels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to submit reels');
        }

        return response.json();
    },

    getUserReels: async (): Promise<Reel[]> => {
        const token = localStorage.getItem('access_token');
        const response = await fetch(`${API_BASE_URL}/reels`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to fetch reels');
        }

        return response.json();
    },
};
