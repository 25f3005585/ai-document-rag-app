'use client';

import { ChatRow } from '@/components/chats/chat-row';
import { useChatStore } from '@/lib/chats/store';

type ChatListProps = {
  onNavigate?: () => void;
};

export function ChatList({ onNavigate }: ChatListProps) {
  const chats = useChatStore((state) => state.chats);

  if (chats.length === 0) {
    return (
      <div className="min-h-0 flex-1 px-4 py-4">
        <p className="text-muted-foreground text-[13px] leading-relaxed">
          No conversations yet. Ask a question to start one.
        </p>
      </div>
    );
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
