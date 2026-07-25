'use client';

import { Button } from '@repo/ui/components/button';
import { Textarea } from '@repo/ui/components/textarea';
import { cn } from '@repo/ui/lib/utils';
import { ArrowRight, Paperclip } from 'lucide-react';

import { COMPOSER_MAX_CHARS, useComposerField } from '@/components/chats/use-composer-field';

type ComposerProps = {
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  onSend: (content: string) => void;
};

function ComposerActions({
  valueLength,
  canSend,
  onSend,
}: {
  valueLength: number;
  canSend: boolean;
  onSend: () => void;
}) {
  return (
    <div className="mt-3 flex items-center justify-between gap-3">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        disabled
        title="Coming soon"
        className="text-muted-foreground h-8 gap-1.5 rounded-full px-2 text-[12px] font-normal"
      >
        <Paperclip className="size-3.5" />
        <span className="hidden sm:inline">Add Attachment</span>
      </Button>
      <div className="flex items-center gap-2.5">
        <span className="text-muted-foreground text-[12px] tabular-nums">
          {valueLength}/{COMPOSER_MAX_CHARS}
        </span>
        <Button
          type="button"
          size="icon"
          aria-label="Send message"
          disabled={!canSend}
          className={cn(
            'size-9 rounded-full transition-colors',
            canSend
              ? 'bg-foreground text-background hover:bg-foreground/90'
              : 'bg-muted text-muted-foreground',
          )}
          onClick={onSend}
        >
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export function Composer({
  disabled = false,
  placeholder = 'Ask whatever you want…',
  autoFocus = false,
  onSend,
}: ComposerProps) {
  const field = useComposerField(onSend, disabled);

  return (
    <div className="border-border/70 bg-card w-full rounded-2xl border p-3.5 shadow-soft md:p-4">
      <Textarea
        ref={field.textareaRef}
        value={field.value}
        disabled={disabled}
        placeholder={placeholder}
        autoFocus={autoFocus}
        rows={2}
        maxLength={COMPOSER_MAX_CHARS}
        aria-label="Message"
        className="min-h-[64px] w-full resize-none border-0 bg-transparent p-0 text-[15px] leading-relaxed shadow-none placeholder:text-[#a39e98] focus-visible:ring-0 dark:bg-transparent"
        onChange={(event) => {
          field.setValue(event.target.value);
        }}
        onKeyDown={field.onKeyDown}
      />
      <ComposerActions
        valueLength={field.value.length}
        canSend={field.canSend}
        onSend={field.submit}
      />
    </div>
  );
}
