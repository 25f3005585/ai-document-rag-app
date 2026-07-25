export type Citation = {
  title: string;
  snippet: string;
};

export type MessageRole = 'user' | 'assistant';

export type Message = {
  id: string;
  chatId: string;
  role: MessageRole;
  content: string;
  createdAt: number;
  citations?: Citation[];
};

export type Chat = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
};
