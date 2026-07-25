'use client';

import { ChatHeader } from '@/components/chats/chat-header';
import { Composer } from '@/components/chats/composer';
import { EmptyState } from '@/components/chats/empty-state';
import { MessageList } from '@/components/chats/message-list';
import { CHAT_COLUMN } from '@/lib/chats/layout';
import type { Message } from '@/lib/chats/types';

type ChatWorkspaceProps = {
  title: string;
  messages: Message[];
  isGenerating: boolean;
  onSend: (content: string) => void;
};

export function ChatEmptyWorkspace({
  isGenerating,
  onSend,
}: Pick<ChatWorkspaceProps, 'isGenerating' | 'onSend'>) {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-y-auto py-8 md:py-12">
        <div className={CHAT_COLUMN}>
          <EmptyState onSuggest={onSend} />
          <div className="mt-10 sm:mt-12">
            <Composer
              disabled={isGenerating}
              autoFocus
              placeholder="Ask whatever you want…"
              onSend={onSend}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ChatThreadWorkspace({ title, messages, isGenerating, onSend }: ChatWorkspaceProps) {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col">
      <ChatHeader title={title} />
      <div className="min-h-0 w-full flex-1 overflow-y-auto">
        <MessageList messages={messages} isGenerating={isGenerating} />
      </div>
      <div className="relative w-full shrink-0 pb-5 md:pb-6">
        <div className="from-background pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t to-transparent" />
        <div className={`${CHAT_COLUMN} pt-2`}>
          <Composer disabled={isGenerating} onSend={onSend} />
        </div>
      </div>
    </div>
  );
}
