'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Activity, ClipboardCheck, LogOut, Megaphone } from 'lucide-react';
import { adminAuth } from '@/lib/auth';
import { cn } from '@/lib/utils';

const NAV = [
  { href: '/dashboard', label: 'Overview', icon: Activity, exact: true },
  { href: '/dashboard/campaigns', label: 'Campaigns', icon: Megaphone },
  { href: '/dashboard/review', label: 'Review Queue', icon: ClipboardCheck },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!adminAuth.isAdmin()) {
      router.replace('/login');
      return;
    }
    setEmail(adminAuth.getPayload()?.email ?? null);
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="ops-label animate-blink">Verifying access…</p>
      </div>
    );
  }

  const isActive = (item: (typeof NAV)[number]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const logout = () => {
    adminAuth.clear();
    router.replace('/login');
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Sidebar (desktop) */}
      <aside className="hidden lg:flex lg:w-60 lg:flex-col border-r border-border bg-card/60 backdrop-blur">
        <div className="border-b border-border px-5 py-6">
          <p className="ops-label mb-2 flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 bg-primary animate-blink" />
            Operations
          </p>
          <Link href="/dashboard" className="font-display text-2xl font-black uppercase tracking-tight">
            OC<span className="text-primary">_</span>OPS
          </Link>
        </div>

        <nav className="flex-1 space-y-px p-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] transition-colors border-l-2',
                isActive(item)
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-accent',
              )}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-border p-4 space-y-3">
          <div>
            <p className="ops-label">Operator</p>
            <p className="truncate font-mono text-xs text-foreground">{email}</p>
          </div>
          <button
            onClick={logout}
            className="flex w-full items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground hover:text-destructive transition-colors"
          >
            <LogOut className="h-3 w-3" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Topbar (mobile) */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/90 px-4 py-3 backdrop-blur lg:hidden">
        <Link href="/dashboard" className="font-display text-lg font-black uppercase tracking-tight">
          OC<span className="text-primary">_</span>OPS
        </Link>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
        >
          <LogOut className="h-3 w-3" /> Exit
        </button>
      </header>

      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-4 pb-24 sm:p-6 lg:p-8 lg:pb-8">{children}</main>
      </div>

      {/* Bottom nav (mobile) */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-card/95 backdrop-blur lg:hidden">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center gap-1 py-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] border-t-2 -mt-px transition-colors',
              isActive(item)
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground',
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label.split(' ')[0]}
          </Link>
        ))}
      </nav>
    </div>
  );
}
