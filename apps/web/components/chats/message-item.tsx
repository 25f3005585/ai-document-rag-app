'use client';

import { CitationChips } from '@/components/chats/citation-chips';
import type { Message } from '@/lib/chats/types';

type MessageItemProps = {
  message: Message;
};

export function MessageItem({ message }: MessageItemProps) {
  const isUser = message.role === 'user';

  if (isUser) {
    return (
      <article className="chat-fade-in flex w-full justify-end">
        <div className="bg-secondary/80 text-foreground max-w-[85%] rounded-2xl rounded-br-md px-4 py-2.5 text-[15px] leading-relaxed">
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="chat-fade-in w-full">
      <div className="mb-2 flex items-center gap-2">
        <span className="bg-foreground text-background flex size-5 items-center justify-center rounded-[5px] text-[10px] font-bold">
          A
        </span>
        <span className="text-muted-foreground text-xs font-medium tracking-wide">AskDocs</span>
      </div>
      <div className="text-foreground max-w-none text-[16px] leading-[1.65]">
        <p className="whitespace-pre-wrap text-[#31302e] dark:text-[#ebeae8]">{message.content}</p>
        {message.citations ? <CitationChips citations={message.citations} /> : null}
      </div>
    </article>
  );
}

export function TypingIndicator() {
  return (
    <div className="chat-fade-in flex items-start gap-2.5" aria-live="polite">
      <span className="bg-foreground text-background mt-0.5 flex size-5 items-center justify-center rounded-[5px] text-[10px] font-bold">
        A
      </span>
      <div>
        <p className="text-muted-foreground text-xs font-medium tracking-wide">AskDocs</p>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="sr-only">Writing an answer</span>
          <span className="bg-muted-foreground/40 size-1.5 animate-pulse rounded-full [animation-delay:0ms]" />
          <span className="bg-muted-foreground/40 size-1.5 animate-pulse rounded-full [animation-delay:160ms]" />
          <span className="bg-muted-foreground/40 size-1.5 animate-pulse rounded-full [animation-delay:320ms]" />
        </div>
      </div>
    </div>
  );
}
