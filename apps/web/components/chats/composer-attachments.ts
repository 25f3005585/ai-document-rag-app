export const COMPOSER_ACCEPT =
  '.pdf,.doc,.docx,.txt,.md,.csv,.rtf,.pptx,.xlsx,application/pdf,text/plain,text/markdown,text/csv';

export const COMPOSER_MAX_FILES = 10;
export const COMPOSER_MAX_FILE_BYTES = 10 * 1024 * 1024;

export type ComposerFile = {
  id: string;
  file: File;
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
): ComposerFile[] {
  const room = COMPOSER_MAX_FILES - current.length;
  if (room <= 0) {
    return current;
  }
  const accepted = incoming.filter((item) => item.file.size <= COMPOSER_MAX_FILE_BYTES);
  return [...current, ...accepted.slice(0, room)];
}
