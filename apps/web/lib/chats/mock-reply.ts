import type { Citation } from '@/lib/chats/types';

const CITATIONS: Citation[] = [
  {
    title: 'Product overview.pdf',
    snippet: 'AskDocs indexes uploaded documents and answers with grounded citations.',
  },
  {
    title: 'Getting started.md',
    snippet: 'Upload a PDF or Markdown file, then ask questions in the chat thread.',
  },
  {
    title: 'Security FAQ.docx',
    snippet: 'Documents stay in your workspace; answers reference only selected sources.',
  },
];

const truncate = (value: string, max: number): string => {
  const trimmed = value.trim().replace(/\s+/g, ' ');
  if (trimmed.length <= max) {
    return trimmed;
  }
  return `${trimmed.slice(0, max - 1)}…`;
};

export const titleFromPrompt = (prompt: string): string => truncate(prompt, 42);

export const buildMockReply = (prompt: string): { content: string; citations: Citation[] } => {
  const topic = truncate(prompt, 72);
  const citations = CITATIONS.slice(0, prompt.length % 2 === 0 ? 2 : 1);

  return {
    content: [
      `Based on your documents, here’s a concise answer about “${topic}”.`,
      '',
      'The sources describe AskDocs as a calm workspace for uploading files and asking grounded questions. Relevant passages are cited below so you can verify the claim without leaving the thread.',
    ].join('\n'),
    citations,
  };
};

export const MOCK_REPLY_DELAY_MS = 700;
