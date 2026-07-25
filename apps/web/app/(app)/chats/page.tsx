import type { Metadata } from 'next';

import { ChatPanel } from '@/components/chats/chat-panel';

export const metadata: Metadata = {
  title: 'Chats',
};

export default function ChatsPage() {
  return <ChatPanel />;
}
