'use client';

import { cn } from '@repo/ui/lib/utils';
import type { ChangeEvent, DragEvent, ReactNode, RefObject } from 'react';

import { COMPOSER_ACCEPT } from '@/components/chats/composer-attachments';

type ComposerShellProps = {
  focused: boolean;
  isDragging: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onDragEnter: (event: DragEvent) => void;
  onDragLeave: (event: DragEvent) => void;
  onDragOver: (event: DragEvent) => void;
  onDrop: (event: DragEvent) => void;
  children: ReactNode;
};

export function ComposerShell({
  focused,
  isDragging,
  inputRef,
  onInputChange,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  children,
}: ComposerShellProps) {
  return (
    <div
      className={cn(
        'bg-card relative w-full rounded-[20px] border p-4 transition-[border-color,box-shadow] shadow-soft',
        focused || isDragging ? 'border-foreground/20' : 'border-border/80',
        isDragging && 'ring-foreground/10 ring-2',
      )}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={COMPOSER_ACCEPT}
        className="sr-only"
        tabIndex={-1}
        onChange={onInputChange}
      />
      {children}
      {isDragging ? (
        <div className="bg-background/70 pointer-events-none absolute inset-0 flex items-center justify-center rounded-[20px]">
          <p className="text-foreground text-[13px] font-medium">Drop documents to attach</p>
        </div>
      ) : null}
    </div>
  );
}
