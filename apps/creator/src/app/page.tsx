'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminAuth } from '@/lib/auth';

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(adminAuth.isAdmin() ? '/dashboard' : '/login');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="ops-label animate-blink">Routing…</p>
    </div>
  );
}
