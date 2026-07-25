import type { Metadata } from 'next';

import { ChatPanel } from '@/components/chats/chat-panel';

type ChatPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: 'Chat',
};

export default async function ChatPage({ params }: ChatPageProps) {
  const { id } = await params;
  return <ChatPanel chatId={id} />;
}
