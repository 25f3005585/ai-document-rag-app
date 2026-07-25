'use client';

import { useEffect, useRef } from 'react';

import { MessageItem, TypingIndicator } from '@/components/chats/message-item';
import { CHAT_COLUMN } from '@/lib/chats/layout';
import type { Message } from '@/lib/chats/types';

type MessageListProps = {
  messages: Message[];
  isGenerating: boolean;
};

export function MessageList({ messages, isGenerating }: MessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length, isGenerating]);

  return (
    <div className="w-full">
      <div className={`${CHAT_COLUMN} flex flex-col gap-7 py-6 md:gap-8 md:py-8`}>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        {isGenerating ? <TypingIndicator /> : null}
        <div ref={endRef} className="h-2" />
      </div>
    </div>
  );
}
