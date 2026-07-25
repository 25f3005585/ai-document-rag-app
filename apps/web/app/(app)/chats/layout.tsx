import { AppShell } from '@/components/chats/app-shell';

export default function ChatsLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
