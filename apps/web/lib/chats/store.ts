'use client';

import { create } from 'zustand';

import { buildMockReply, MOCK_REPLY_DELAY_MS, titleFromPrompt } from '@/lib/chats/mock-reply';
import type { Chat, Message } from '@/lib/chats/types';

type ChatStore = {
  chats: Chat[];
  messagesByChatId: Record<string, Message[]>;
  generatingChatId: string | null;
  createChat: () => string;
  deleteChat: (chatId: string) => void;
  renameChat: (chatId: string, title: string) => void;
  sendMessage: (chatId: string, content: string) => Promise<void>;
};

const createId = (): string => crypto.randomUUID();

const sortByUpdatedAt = (chats: Chat[]): Chat[] =>
  [...chats].sort((a, b) => b.updatedAt - a.updatedAt);

const omitChatMessages = (
  messagesByChatId: Record<string, Message[]>,
  chatId: string,
): Record<string, Message[]> =>
  Object.fromEntries(Object.entries(messagesByChatId).filter(([id]) => id !== chatId));

const touchChat = (chats: Chat[], chatId: string, patch: Partial<Chat>): Chat[] =>
  sortByUpdatedAt(chats.map((chat) => (chat.id === chatId ? { ...chat, ...patch } : chat)));

const appendUserMessage = (
  state: ChatStore,
  chatId: string,
  content: string,
): Pick<ChatStore, 'chats' | 'messagesByChatId' | 'generatingChatId'> => {
  const now = Date.now();
  const existing = state.messagesByChatId[chatId] ?? [];
  const userMessage: Message = {
    id: createId(),
    chatId,
    role: 'user',
    content,
    createdAt: now,
  };

  return {
    generatingChatId: chatId,
    messagesByChatId: {
      ...state.messagesByChatId,
      [chatId]: [...existing, userMessage],
    },
    chats: touchChat(state.chats, chatId, {
      ...(existing.length === 0 ? { title: titleFromPrompt(content) } : {}),
      updatedAt: now,
    }),
  };
};

const appendAssistantMessage = (
  state: ChatStore,
  chatId: string,
  prompt: string,
): Pick<ChatStore, 'chats' | 'messagesByChatId' | 'generatingChatId'> => {
  const reply = buildMockReply(prompt);
  const assistantMessage: Message = {
    id: createId(),
    chatId,
    role: 'assistant',
    content: reply.content,
    createdAt: Date.now(),
    citations: reply.citations,
  };

  return {
    generatingChatId: null,
    messagesByChatId: {
      ...state.messagesByChatId,
      [chatId]: [...(state.messagesByChatId[chatId] ?? []), assistantMessage],
    },
    chats: touchChat(state.chats, chatId, { updatedAt: Date.now() }),
  };
};

export const useChatStore = create<ChatStore>((set, get) => ({
  chats: [],
  messagesByChatId: {},
  generatingChatId: null,

  createChat: () => {
    const now = Date.now();
    const id = createId();
    set((state) => ({
      chats: [{ id, title: 'New chat', createdAt: now, updatedAt: now }, ...state.chats],
      messagesByChatId: { ...state.messagesByChatId, [id]: [] },
    }));
    return id;
  },

  deleteChat: (chatId) => {
    set((state) => ({
      chats: state.chats.filter((chat) => chat.id !== chatId),
      messagesByChatId: omitChatMessages(state.messagesByChatId, chatId),
      generatingChatId: state.generatingChatId === chatId ? null : state.generatingChatId,
    }));
  },

  renameChat: (chatId, title) => {
    const next = title.trim();
    if (!next) {
      return;
    }
    set((state) => ({
      chats: touchChat(state.chats, chatId, { title: next, updatedAt: Date.now() }),
    }));
  },

  sendMessage: async (chatId, content) => {
    const trimmed = content.trim();
    if (!trimmed || get().generatingChatId) {
      return;
    }

    set((state) => appendUserMessage(state, chatId, trimmed));

    await new Promise((resolve) => {
      setTimeout(resolve, MOCK_REPLY_DELAY_MS);
    });

    if (!get().chats.some((chat) => chat.id === chatId)) {
      set({ generatingChatId: null });
      return;
    }

    set((state) => appendAssistantMessage(state, chatId, trimmed));
  },
}));
