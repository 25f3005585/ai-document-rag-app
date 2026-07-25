'use client';

import { useState } from 'react';

import { ComposerFileList } from '@/components/chats/composer-file-list';
import { ComposerFooter } from '@/components/chats/composer-footer';
import { ComposerShell } from '@/components/chats/composer-shell';
import { useComposerAttachments } from '@/components/chats/use-composer-attachments';
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
  const attachments = useComposerAttachments(disabled);
  const field = useComposerField(onSend, disabled, attachments.clearFiles);

  return (
    <ComposerShell
      focused={focused}
      isDragging={attachments.isDragging}
      inputRef={attachments.inputRef}
      onInputChange={attachments.onInputChange}
      onDragEnter={attachments.onDragEnter}
      onDragLeave={attachments.onDragLeave}
      onDragOver={attachments.onDragOver}
      onDrop={attachments.onDrop}
    >
      <ComposerFileList
        files={attachments.files}
        disabled={disabled}
        onRemove={attachments.removeFile}
      />
      <textarea
        ref={field.textareaRef}
        value={field.value}
        disabled={disabled}
        placeholder={placeholder}
        autoFocus={autoFocus}
        rows={3}
        maxLength={COMPOSER_MAX_CHARS}
        aria-label="Message"
        className="text-foreground placeholder:text-muted-foreground max-h-[280px] min-h-[88px] w-full resize-none overflow-y-auto bg-transparent text-[15px] leading-relaxed outline-none disabled:cursor-not-allowed disabled:opacity-60"
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
        disabled={disabled}
        onAttach={attachments.openPicker}
        onSend={field.submit}
      />
    </ComposerShell>
  );
}
