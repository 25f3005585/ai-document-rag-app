'use client';

import { FileText, X } from 'lucide-react';

import type { ComposerFile } from '@/components/chats/composer-attachments';

type ComposerFileListProps = {
  files: ComposerFile[];
  disabled?: boolean;
  onRemove: (id: string) => void;
};

function formatBytes(size: number): string {
  if (size < 1024) {
    return `${String(size)} B`;
  }
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(0)} KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export function ComposerFileList({ files, disabled = false, onRemove }: ComposerFileListProps) {
  if (files.length === 0) {
    return null;
  }

  return (
    <ul aria-label="Attached documents" className="mb-3 flex flex-wrap gap-2">
      {files.map(({ id, file }) => (
        <li
          key={id}
          className="border-border bg-muted/60 text-foreground inline-flex max-w-full items-center gap-2 rounded-xl border px-2.5 py-1.5 text-[12px] shadow-soft"
        >
          <span className="bg-background text-muted-foreground flex size-7 shrink-0 items-center justify-center rounded-lg border border-border/70">
            <FileText className="size-3.5" aria-hidden />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-medium leading-tight">{file.name}</span>
            <span className="text-muted-foreground block text-[11px] leading-tight">
              {formatBytes(file.size)}
            </span>
          </span>
          <button
            type="button"
            disabled={disabled}
            aria-label={`Remove ${file.name}`}
            className="text-muted-foreground hover:text-foreground hover:bg-background ml-0.5 rounded-md p-1 transition-colors disabled:opacity-50"
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
