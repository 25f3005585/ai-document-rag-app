'use client';

import { useRouter } from 'next/navigation';

import { ChatEmptyWorkspace, ChatThreadWorkspace } from '@/components/chats/chat-workspace';
import { useChatStore } from '@/lib/chats/store';
import type { Message } from '@/lib/chats/types';

/** Stable empty snapshot — inline `[]` breaks useSyncExternalStore equality. */
const EMPTY_MESSAGES: Message[] = [];

type ChatPanelProps = {
  chatId?: string;
};

export function ChatPanel({ chatId }: ChatPanelProps) {
  const router = useRouter();
  const createChat = useChatStore((state) => state.createChat);
  const sendMessage = useChatStore((state) => state.sendMessage);
  const generatingChatId = useChatStore((state) => state.generatingChatId);
  const chatTitle = useChatStore((state) =>
    chatId ? (state.chats.find((chat) => chat.id === chatId)?.title ?? 'Chat') : 'Chat',
  );
  const messages = useChatStore((state) => {
    if (!chatId) {
      return EMPTY_MESSAGES;
    }
    return state.messagesByChatId[chatId] ?? EMPTY_MESSAGES;
  });
  const chatExists = useChatStore((state) =>
    chatId ? state.chats.some((chat) => chat.id === chatId) : true,
  );

  const isGenerating = Boolean(chatId && generatingChatId === chatId);
  const showEmpty = !chatId || messages.length === 0;

  const handleSend = (content: string) => {
    if (chatId) {
      void sendMessage(chatId, content);
      return;
    }
    const id = createChat();
    router.push(`/chats/${id}`);
    void sendMessage(id, content);
  };

  if (chatId && !chatExists) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <p className="text-foreground text-xl font-semibold tracking-tight">Chat not found</p>
        <p className="text-muted-foreground mt-2 max-w-sm text-sm leading-relaxed">
          This conversation was deleted or never existed.
        </p>
      </div>
    );
  }

  if (showEmpty) {
    return <ChatEmptyWorkspace isGenerating={isGenerating} onSend={handleSend} />;
  }

  return (
    <ChatThreadWorkspace
      title={chatTitle}
      messages={messages}
      isGenerating={isGenerating}
      onSend={handleSend}
    />
  );
}
