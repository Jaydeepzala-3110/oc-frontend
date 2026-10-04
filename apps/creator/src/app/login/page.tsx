'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2, ShieldAlert } from 'lucide-react';
import { adminApi } from '@/lib/api';
import { adminAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { access_token } = await adminApi.signIn(email.trim(), password);
      adminAuth.setToken(access_token);

      if (!adminAuth.isAdmin()) {
        adminAuth.clear();
        toast.error('This console is restricted to ADMIN accounts.');
        return;
      }
      toast.success('Access granted');
      router.replace('/dashboard');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center p-6">
      {/* corner frame marks */}
      <div className="pointer-events-none fixed inset-4 border border-border/40" />
      <div className="pointer-events-none fixed left-4 top-4 h-4 w-4 border-l-2 border-t-2 border-primary" />
      <div className="pointer-events-none fixed right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-primary" />
      <div className="pointer-events-none fixed bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-primary" />
      <div className="pointer-events-none fixed bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-primary" />

      <div className="w-full max-w-sm space-y-10 animate-fade-up">
        <header className="space-y-3">
          <p className="ops-label flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 bg-primary animate-blink" />
            Only Creators / Operations
          </p>
          <h1 className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight">
            OC
            <span className="text-primary">_</span>
            OPS
          </h1>
          <p className="font-mono text-xs text-muted-foreground leading-relaxed">
            Campaign control console. Validation review, payouts, telemetry.
          </p>
        </header>

        <form onSubmit={handleSubmit} className="ops-panel space-y-5 p-6">
          <div className="space-y-1.5">
            <label htmlFor="email" className="ops-label">
              Operator Email
            </label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="admin@onlycreators.dev"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="password" className="ops-label">
              Passphrase
            </label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : 'Authenticate'}
          </Button>
          <p className="flex items-center gap-2 font-mono text-[10px] text-muted-foreground">
            <ShieldAlert className="h-3 w-3 text-warning" />
            ADMIN role required. All actions are logged.
          </p>
        </form>
      </div>
    </main>
  );
}
