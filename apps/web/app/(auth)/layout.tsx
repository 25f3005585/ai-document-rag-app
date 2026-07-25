import { redirect } from 'next/navigation';

import { getServerSession } from '@/lib/auth-server';
import { DEFAULT_REDIRECT_PATH } from '@/lib/constants';

/** Logged-in users should not sit on login/signup (validated session, not cookie alone). */
export default async function AuthGroupLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (session?.user) {
    redirect(DEFAULT_REDIRECT_PATH);
  }

  return children;
}
