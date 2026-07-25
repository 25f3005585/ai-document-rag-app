'use client';

import { ScrollArea } from '@repo/ui/components/scroll-area';

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
    <ScrollArea className="min-h-0 flex-1 px-2">
      <nav aria-label="Chats" className="flex flex-col gap-0.5 py-1">
        {chats.map((chat) => (
          <ChatRow key={chat.id} chat={chat} onNavigate={onNavigate} />
        ))}
      </nav>
    </ScrollArea>
  );
}
