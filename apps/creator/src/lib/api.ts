import { adminAuth } from './auth';

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const token = adminAuth.getToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (response.status === 401 || response.status === 403) {
    adminAuth.clear();
    if (typeof window !== 'undefined') window.location.href = '/login';
    throw new Error('Session expired — sign in again');
  }

  const body = await response.json().catch(() => null);
  if (!response.ok) {
    const message = Array.isArray(body?.message)
      ? body.message.join(', ')
      : body?.message;
    throw new Error(message || `Request failed (${response.status})`);
  }
  return body as T;
}

// ---- Types mirroring oc-backend admin endpoints ----

export interface AdminCheck {
  id: string;
  label: string;
  passed: boolean | null;
  detail?: string;
}

export interface AdminSubmission {
  id: number;
  campaign: { id: number; title: string; type: string; payRate?: number; payUnit?: string };
  clipper: { id: number; firstName: string; lastName: string; email: string };
  submissionUrl: string;
  submissionStatus: 'PENDING' | 'VERIFIED' | 'REJECTED' | string;
  submittedAt: string | null;
  views: number;
  earnings: number;
  lastMetricsSync: string | null;
  username: string | null;
  permalink: string | null;
  rejectionCode: string | null;
  rejectionReason: string | null;
  metrics: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    reach: number;
    engagementPercent: number;
  } | null;
  checks: AdminCheck[];
  needsReview: boolean;
  reviewedAt: string | null;
}

export interface AdminOverview {
  campaigns: Record<string, number>;
  submissions: Record<string, number>;
  totalViews: number;
  totalEarnings: number;
  recentSubmissions: AdminSubmission[];
}

export interface AdminCampaign {
  id: number;
  title: string;
  description: string;
  type: string;
  typeConfig: Record<string, unknown> | null;
  status: string;
  platforms: string[];
  payRate: number;
  payUnit: string;
  budget: number;
  image: string | null;
  startDate: string;
  endDate: string;
  createdAt: string;
  participantCount: number;
  submissionCount: number;
  pendingCount: number;
  verifiedCount: number;
  rejectedCount: number;
  totalViews: number;
  totalEarnings: number;
}

export const adminApi = {
  overview: () => apiFetch<AdminOverview>('/campaigns/admin/overview'),
  campaigns: () => apiFetch<AdminCampaign[]>('/campaigns/admin/list'),
  submissions: (params?: { status?: string; campaignId?: number }) => {
    const query = new URLSearchParams();
    if (params?.status) query.set('status', params.status);
    if (params?.campaignId) query.set('campaignId', String(params.campaignId));
    const qs = query.toString();
    return apiFetch<AdminSubmission[]>(
      `/campaigns/admin/submissions${qs ? `?${qs}` : ''}`,
    );
  },
  createCampaign: (payload: Record<string, unknown>) =>
    apiFetch<{ id: number }>('/campaigns', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  reviewCheck: (
    participationId: number,
    payload: { checkId: string; passed: boolean; note?: string },
  ) =>
    apiFetch(`/campaigns/participations/${participationId}/review`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
  signIn: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const body = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(body?.message || 'Invalid credentials');
    }
    return body as { access_token: string };
  },
};
