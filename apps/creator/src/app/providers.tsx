'use client';

import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: 1, refetchOnWindowFocus: false, staleTime: 15_000 },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: 'hsl(76 9% 7%)',
            border: '1px solid hsl(76 6% 18%)',
            color: 'hsl(70 12% 88%)',
            borderRadius: '2px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
          },
        }}
      />
    </QueryClientProvider>
  );
}
