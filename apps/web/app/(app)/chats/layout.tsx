import { AppShell } from '@/components/chats/app-shell';
import { getServerSession } from '@/lib/auth-server';

export default async function ChatsLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();
  const user = session?.user
    ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
      }
    : null;

  return <AppShell user={user}>{children}</AppShell>;
}
