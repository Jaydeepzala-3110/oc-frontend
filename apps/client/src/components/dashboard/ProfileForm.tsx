"use client";

import { Users, Mail, Phone, Instagram, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi, type UpdateProfileData } from '@/api/profileApi';
import { useState, useEffect } from 'react';

export default function ProfileForm() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    username: "",
    phoneNumber: "",
    instagramId: "",
    instagramUrl: "",
  });

  // Fetch profile using React Query
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: profileApi.getProfile,
  });

  // Update form when profile data loads
  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username || "",
        phoneNumber: profile.phoneNumber || "",
        instagramId: profile.instagramId || "",
        instagramUrl: profile.instagramUrl || "",
      });
    }
  }, [profile]);

  // Update profile mutation
  const updateMutation = useMutation({
    mutationFn: (data: UpdateProfileData) => profileApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="bg-white dark:bg-card rounded-lg border border-gray-200 dark:border-border shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-border">
          <h2 className="text-2xl font-semibold text-foreground">Profile Settings</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your account information and preferences
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">
                {error instanceof Error ? error.message : 'An error occurred'}
              </p>
            </div>
          )}

          {updateMutation.isError && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">
                {updateMutation.error instanceof Error ? updateMutation.error.message : 'Failed to update profile'}
              </p>
            </div>
          )}

          {updateMutation.isSuccess && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400">
                Profile updated successfully!
              </p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-foreground mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Username
              </label>
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-border rounded-lg bg-white dark:bg-background text-foreground focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email
              </label>
              <input
                id="email"
                type="email"
                value={profile?.email || ""}
                disabled
                className="w-full px-4 py-2 border border-gray-300 dark:border-border rounded-lg bg-gray-50 dark:bg-muted text-muted-foreground cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Email cannot be changed
              </p>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-foreground mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-border rounded-lg bg-white dark:bg-background text-foreground focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label htmlFor="instagramId" className="block text-sm font-medium text-foreground mb-2">
                <Instagram className="w-4 h-4 inline mr-2" />
                Instagram ID
              </label>
              <input
                id="instagramId"
                type="text"
                value={formData.instagramId}
                onChange={(e) => setFormData({ ...formData, instagramId: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-border rounded-lg bg-white dark:bg-background text-foreground focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="@yourusername"
              />
            </div>

            <div>
              <label htmlFor="instagramUrl" className="block text-sm font-medium text-foreground mb-2">
                <Instagram className="w-4 h-4 inline mr-2" />
                Instagram URL
              </label>
              <input
                id="instagramUrl"
                type="url"
                value={formData.instagramUrl}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-border rounded-lg bg-white dark:bg-background text-foreground focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="https://instagram.com/yourusername"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="px-6 py-2 bg-primary-500 hover:bg-primary-600 disabled:bg-primary-400 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              {updateMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
