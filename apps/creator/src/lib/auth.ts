const TOKEN_KEY = 'oc_admin_access_token';

export interface AdminTokenPayload {
  sub: number;
  email: string;
  role: string;
}

export const adminAuth = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  setToken: (token: string): void => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  clear: (): void => {
    localStorage.removeItem(TOKEN_KEY);
  },

  getPayload: (): AdminTokenPayload | null => {
    const token = adminAuth.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp && payload.exp * 1000 < Date.now()) return null;
      return payload as AdminTokenPayload;
    } catch {
      return null;
    }
  },

  isAdmin: (): boolean => {
    const role = adminAuth.getPayload()?.role;
    return role === 'ADMIN' || role === 'SUPER_ADMIN';
  },
};
