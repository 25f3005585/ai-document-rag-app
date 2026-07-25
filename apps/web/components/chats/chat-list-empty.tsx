'use client';

import { MessagesSquare } from 'lucide-react';

export function ChatListEmpty() {
  return (
    <div className="min-h-0 flex-1 px-4 py-3">
      <div className="border-border/60 bg-card/80 flex flex-col items-start gap-3 rounded-2xl border px-3.5 py-4 shadow-soft">
        <span className="bg-muted text-muted-foreground flex size-9 items-center justify-center rounded-xl">
          <MessagesSquare className="size-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-foreground text-[13px] leading-snug font-medium tracking-tight">
            No conversations yet
          </p>
          <p className="text-muted-foreground mt-1 text-[12px] leading-relaxed">
            Ask a question or tap New chat — your recent threads will show up here.
          </p>
        </div>
      </div>
    </div>
  );
}
