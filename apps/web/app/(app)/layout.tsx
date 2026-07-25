import { redirect } from 'next/navigation';

import { AppShell } from '@/components/chats/app-shell';
import { getServerSession } from '@/lib/auth-server';
import { DEFAULT_AUTH_REDIRECT_PATH } from '@/lib/constants';
import { toSessionUser } from '@/lib/session-user';

/** Protects `/chats` and any future routes under `(app)`. */
export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (!session?.user) {
    redirect(DEFAULT_AUTH_REDIRECT_PATH);
  }

  return <AppShell user={toSessionUser(session.user)}>{children}</AppShell>;
}
