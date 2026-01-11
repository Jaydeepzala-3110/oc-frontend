const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface SignupRequest {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  referralCode?: string;
  role?: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface SigninRequest {
  email: string;
  password: string;
}

export interface ApiError {
  message: string;
  statusCode?: number;
  error?: string;
}

const handleApiError = async (response: Response): Promise<ApiError> => {
  let error: ApiError;
  try {
    const data = await response.json();
    error = {
      message: data.message || data.error || 'An error occurred',
      statusCode: response.status,
      error: data.error,
    };
  } catch {
    error = {
      message: `Request failed with status ${response.status}`,
      statusCode: response.status,
    };
  }
  return error;
};

export const authApi = {
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await handleApiError(response);
      throw error;
    }

    return response.json();
  },

  signin: async (data: SigninRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await handleApiError(response);
      throw error;
    }

    return response.json();
  },

  logout: async (): Promise<void> => {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const error = await handleApiError(response);
      throw error;
    }
  },

  refreshTokens: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    if (!response.ok) {
      const error = await handleApiError(response);
      throw error;
    }

    return response.json();
  },
};
