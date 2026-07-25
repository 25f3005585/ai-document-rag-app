'use client';

import { FileText, X } from 'lucide-react';

import type { ComposerFile } from '@/components/chats/composer-attachments';

type ComposerFileListProps = {
  files: ComposerFile[];
  disabled?: boolean;
  onRemove: (id: string) => void;
};

export function ComposerFileList({ files, disabled = false, onRemove }: ComposerFileListProps) {
  if (files.length === 0) {
    return null;
  }

  return (
    <ul className="mb-2 flex flex-wrap gap-1.5">
      {files.map(({ id, file }) => (
        <li
          key={id}
          className="border-border/70 bg-muted/50 text-foreground inline-flex max-w-full items-center gap-1.5 rounded-lg border px-2 py-1 text-[12px]"
        >
          <FileText className="text-muted-foreground size-3.5 shrink-0" aria-hidden />
          <span className="truncate">{file.name}</span>
          <button
            type="button"
            disabled={disabled}
            aria-label={`Remove ${file.name}`}
            className="text-muted-foreground hover:text-foreground rounded p-0.5 disabled:opacity-50"
            onClick={() => {
              onRemove(id);
            }}
          >
            <X className="size-3.5" />
          </button>
        </li>
      ))}
    </ul>
  );
}
