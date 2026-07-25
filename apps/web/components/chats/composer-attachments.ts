export const COMPOSER_ACCEPT =
  '.pdf,.doc,.docx,.txt,.md,.csv,.rtf,.pptx,.xlsx,application/pdf,text/plain,text/markdown,text/csv';

export const COMPOSER_MAX_FILES = 10;
export const COMPOSER_MAX_FILE_BYTES = 10 * 1024 * 1024;

export type ComposerFile = {
  id: string;
  file: File;
};

export type MergeComposerFilesResult = {
  files: ComposerFile[];
  added: number;
  skippedOversize: number;
  skippedLimit: number;
};

export function toComposerFiles(list: FileList | File[]): ComposerFile[] {
  return Array.from(list).map((file) => ({
    id: crypto.randomUUID(),
    file,
  }));
}

export function mergeComposerFiles(
  current: ComposerFile[],
  incoming: ComposerFile[],
): MergeComposerFilesResult {
  const room = COMPOSER_MAX_FILES - current.length;
  if (room <= 0) {
    return { files: current, added: 0, skippedOversize: 0, skippedLimit: incoming.length };
  }

  const withinSize = incoming.filter((item) => item.file.size <= COMPOSER_MAX_FILE_BYTES);
  const accepted = withinSize.slice(0, room);

  return {
    files: [...current, ...accepted],
    added: accepted.length,
    skippedOversize: incoming.length - withinSize.length,
    skippedLimit: Math.max(0, withinSize.length - accepted.length),
  };
}

export function formatAttachFeedback(added: number, names: string[]): string {
  if (added === 1 && names[0]) {
    return `Attached ${names[0]}`;
  }
  if (added > 1) {
    return `Attached ${String(added)} documents`;
  }
  return 'Documents attached';
}
