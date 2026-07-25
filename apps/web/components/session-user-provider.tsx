'use client';

import { createContext, use } from 'react';

import type { SessionUser } from '@/lib/session-user';

const SessionUserContext = createContext<SessionUser | null>(null);

export function SessionUserProvider({
  user,
  children,
}: {
  user: SessionUser | null;
  children: React.ReactNode;
}) {
  return <SessionUserContext.Provider value={user}>{children}</SessionUserContext.Provider>;
}

export function useSessionUser(): SessionUser | null {
  return use(SessionUserContext);
}
