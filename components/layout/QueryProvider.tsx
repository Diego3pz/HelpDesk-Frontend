'use client';

import { ReactNode } from 'react';
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function QueryProvider({
  children,
  state,
}: {
  children: ReactNode;
  state?: unknown; // Aquí llega el estado dehydrate()
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={state ?? {}}>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
