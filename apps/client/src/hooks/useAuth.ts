"use client";

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi, type SignupRequest, type SigninRequest } from '@/api/authApi';
import { authStorage } from '@/lib/auth';
import { toast } from 'sonner';

export const useSignup = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignupRequest) => authApi.signup(data),
    onSuccess: (response) => {
      // Store tokens
      authStorage.setTokens(response.access_token, response.refresh_token);
      
      // Show success message
      toast.success('Account created successfully!', {
        description: 'Welcome! Redirecting to dashboard...',
      });

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    },
    onError: (error: { message?: string; statusCode?: number }) => {
      const message = error?.message || 'Failed to create account. Please try again.';
      
      if (error?.statusCode === 403 && message.toLowerCase().includes('already exists')) {
        toast.error('Email already registered', {
          description: 'Please use a different email or sign in instead.',
        });
      } else {
        toast.error('Signup failed', {
          description: message,
        });
      }
    },
  });
};

export const useSignin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SigninRequest) => authApi.signin(data),
    onSuccess: (response) => {
      // Store tokens
      authStorage.setTokens(response.access_token, response.refresh_token);
      
      // Show success message
      toast.success('Signed in successfully!', {
        description: 'Redirecting to dashboard...',
      });

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    },
    onError: (error: { message?: string; statusCode?: number }) => {
      const message = error?.message || 'Failed to sign in. Please try again.';
      
      toast.error('Sign in failed', {
        description: message,
      });
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      authStorage.clearTokens();
      toast.success('Logged out successfully');
      router.push('/login');
    },
    onError: (error: { message?: string }) => {
      // Even if logout fails on server, clear local tokens
      authStorage.clearTokens();
      toast.error('Logout failed', {
        description: error?.message || 'An error occurred during logout',
      });
      router.push('/login');
    },
  });
};

