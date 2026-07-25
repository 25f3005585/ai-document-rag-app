'use client';

import { cn } from '@repo/ui/lib/utils';
import { useState } from 'react';

import { ComposerFooter } from '@/components/chats/composer-footer';
import { COMPOSER_MAX_CHARS, useComposerField } from '@/components/chats/use-composer-field';

type ComposerProps = {
  disabled?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  onSend: (content: string) => void;
};

export function Composer({
  disabled = false,
  placeholder = 'Ask whatever you want…',
  autoFocus = false,
  onSend,
}: ComposerProps) {
  const [focused, setFocused] = useState(false);
  const field = useComposerField(onSend, disabled);

  return (
    <div
      className={cn(
        'bg-card w-full rounded-[20px] border p-4 transition-[border-color,box-shadow] shadow-soft',
        focused ? 'border-foreground/20' : 'border-border/80',
      )}
    >
      <textarea
        ref={field.textareaRef}
        value={field.value}
        disabled={disabled}
        placeholder={placeholder}
        autoFocus={autoFocus}
        rows={1}
        maxLength={COMPOSER_MAX_CHARS}
        aria-label="Message"
        className="text-foreground placeholder:text-muted-foreground max-h-36 min-h-[52px] w-full resize-none bg-transparent text-[15px] leading-relaxed outline-none disabled:cursor-not-allowed disabled:opacity-60"
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        onChange={(event) => {
          field.setValue(event.target.value);
        }}
        onKeyDown={field.onKeyDown}
      />
      <ComposerFooter
        valueLength={field.value.length}
        canSend={field.canSend}
        onSend={field.submit}
      />
    </div>
  );
}
