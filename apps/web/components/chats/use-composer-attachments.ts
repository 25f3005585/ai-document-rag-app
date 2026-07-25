'use client';

import { type ChangeEvent, type DragEvent, useRef, useState } from 'react';

import {
  type ComposerFile,
  mergeComposerFiles,
  toComposerFiles,
} from '@/components/chats/composer-attachments';

function useFileDrag(disabled: boolean, onDropFiles: (files: FileList) => void) {
  const [isDragging, setIsDragging] = useState(false);
  const dragDepth = useRef(0);

  const onDragEnter = (event: DragEvent) => {
    event.preventDefault();
    if (disabled || !event.dataTransfer.types.includes('Files')) {
      return;
    }
    dragDepth.current += 1;
    setIsDragging(true);
  };

  const onDragLeave = (event: DragEvent) => {
    event.preventDefault();
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) {
      setIsDragging(false);
    }
  };

  const onDragOver = (event: DragEvent) => {
    event.preventDefault();
  };

  const onDrop = (event: DragEvent) => {
    event.preventDefault();
    dragDepth.current = 0;
    setIsDragging(false);
    if (!disabled && event.dataTransfer.files.length > 0) {
      onDropFiles(event.dataTransfer.files);
    }
  };

  return { isDragging, onDragEnter, onDragLeave, onDragOver, onDrop };
}

export function useComposerAttachments(disabled: boolean) {
  const [files, setFiles] = useState<ComposerFile[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (list: FileList | File[]) => {
    if (!disabled) {
      setFiles((current) => mergeComposerFiles(current, toComposerFiles(list)));
    }
  };

  const removeFile = (id: string) => {
    setFiles((current) => current.filter((item) => item.id !== id));
  };

  const clearFiles = () => {
    setFiles([]);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const openPicker = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      addFiles(event.target.files);
      event.target.value = '';
    }
  };

  const drag = useFileDrag(disabled, addFiles);

  return { files, inputRef, clearFiles, openPicker, removeFile, onInputChange, ...drag };
}
