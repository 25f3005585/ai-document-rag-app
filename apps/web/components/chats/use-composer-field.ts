'use client';

import { type KeyboardEvent, useEffect, useRef, useState } from 'react';

const MAX_HEIGHT_PX = 140;
export const COMPOSER_MAX_CHARS = 1000;

export function useComposerField(onSend: (content: string) => void, disabled: boolean) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const canSend = value.trim().length > 0 && !disabled && value.length <= COMPOSER_MAX_CHARS;

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) {
      return;
    }
    el.style.height = 'auto';
    el.style.height = `${String(Math.min(el.scrollHeight, MAX_HEIGHT_PX))}px`;
  }, [value]);

  const submit = () => {
    if (!canSend) {
      return;
    }
    const next = value.trim();
    setValue('');
    onSend(next);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  return { value, setValue, textareaRef, canSend, submit, onKeyDown };
}
