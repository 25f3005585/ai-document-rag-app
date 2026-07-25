'use client';

import { FileText } from 'lucide-react';

import type { Citation } from '@/lib/chats/types';

type CitationChipsProps = {
  citations: Citation[];
};

export function CitationChips({ citations }: CitationChipsProps) {
  if (citations.length === 0) {
    return null;
  }

  return (
    <div className="mt-5 border-t border-black/[0.06] pt-4 dark:border-white/[0.08]">
      <p className="text-muted-foreground mb-2.5 text-[11px] font-semibold tracking-[0.08em] uppercase">
        Sources
      </p>
      <ul className="flex flex-col gap-2" aria-label="Citations">
        {citations.map((citation, index) => (
          <li
            key={`${citation.title}-${String(index)}`}
            className="border-border bg-card/80 group flex gap-3 rounded-lg border px-3 py-2.5 transition-colors hover:bg-card"
          >
            <span className="bg-muted text-muted-foreground mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md">
              <FileText className="size-3.5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-primary truncate text-sm font-medium">{citation.title}</p>
              <p className="text-muted-foreground mt-0.5 line-clamp-2 text-[13px] leading-snug">
                {citation.snippet}
              </p>
            </div>
            <span className="text-muted-foreground/70 mt-0.5 text-[11px] tabular-nums">
              {String(index + 1).padStart(2, '0')}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
