'use client';

import { ChatListEmpty } from '@/components/chats/chat-list-empty';
import { ChatRow } from '@/components/chats/chat-row';
import { useChatStore } from '@/lib/chats/store';

type ChatListProps = {
  onNavigate?: () => void;
};

export function ChatList({ onNavigate }: ChatListProps) {
  const chats = useChatStore((state) => state.chats);

  if (chats.length === 0) {
    return <ChatListEmpty />;
  }

  return (
    <nav aria-label="Chats" className="min-h-0 flex-1 overflow-y-auto px-3 pb-1">
      <div className="flex flex-col gap-1">
        {chats.map((chat) => (
          <ChatRow key={chat.id} chat={chat} onNavigate={onNavigate} />
        ))}
      </div>
    </nav>
  );
}
