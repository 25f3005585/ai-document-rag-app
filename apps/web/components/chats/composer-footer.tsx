'use client';

import { Button } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';
import { ArrowUp, Paperclip } from 'lucide-react';

import { COMPOSER_MAX_CHARS } from '@/components/chats/use-composer-field';

type ComposerFooterProps = {
  valueLength: number;
  canSend: boolean;
  disabled?: boolean;
  onAttach: () => void;
  onSend: () => void;
};

export function ComposerFooter({
  valueLength,
  canSend,
  disabled = false,
  onAttach,
  onSend,
}: ComposerFooterProps) {
  return (
    <div className="mt-3 flex items-center justify-between gap-3">
      <button
        type="button"
        disabled={disabled}
        aria-label="Add attachment"
        className="text-muted-foreground hover:text-foreground inline-flex h-8 items-center gap-1.5 rounded-lg px-1.5 text-[12px] transition-colors disabled:pointer-events-none disabled:opacity-50"
        onClick={onAttach}
      >
        <Paperclip className="size-3.5" />
        <span className="hidden sm:inline">Add Attachment</span>
      </button>
      <div className="flex items-center gap-2.5">
        <span className="text-muted-foreground/80 text-[11px] tabular-nums">
          {valueLength}/{COMPOSER_MAX_CHARS}
        </span>
        <Button
          type="button"
          size="icon"
          aria-label="Send message"
          disabled={!canSend}
          className={cn(
            'size-8 rounded-full transition-colors',
            canSend
              ? 'bg-foreground text-background hover:bg-foreground/90'
              : 'border-border text-muted-foreground border bg-transparent',
          )}
          onClick={onSend}
        >
          <ArrowUp className="size-4" />
        </Button>
      </div>
    </div>
  );
}
