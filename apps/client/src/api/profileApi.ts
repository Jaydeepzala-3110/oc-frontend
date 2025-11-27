interface ProfileData {
    id: number;
    username: string;
    email: string;
    phoneNumber: string | null;
    instagramId: string | null;
    instagramUrl: string | null;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

interface UpdateProfileData {
    username?: string;
    phoneNumber?: string;
    instagramId?: string;
    instagramUrl?: string;
}

const API_BASE_URL = 'http://localhost:3001';

const getAuthHeaders = () => {
    const token = localStorage.getItem('access_token');
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
};

export const profileApi = {
    getProfile: async (): Promise<ProfileData> => {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }

        return response.json();
    },

    updateProfile: async (data: UpdateProfileData): Promise<ProfileData> => {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to update profile');
        }

        return response.json();
    },
};

export type { ProfileData, UpdateProfileData };
