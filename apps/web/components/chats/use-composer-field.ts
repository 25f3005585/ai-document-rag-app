'use client';

import { type KeyboardEvent, useEffect, useRef, useState } from 'react';

const MIN_HEIGHT_PX = 88;
const MAX_HEIGHT_PX = 280;
export const COMPOSER_MAX_CHARS = 1000;

export function useComposerField(
  onSend: (content: string) => void,
  disabled: boolean,
  onSubmitted?: () => void,
) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const canSend = value.trim().length > 0 && !disabled && value.length <= COMPOSER_MAX_CHARS;

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) {
      return;
    }
    el.style.height = 'auto';
    const next = Math.min(Math.max(el.scrollHeight, MIN_HEIGHT_PX), MAX_HEIGHT_PX);
    el.style.height = `${String(next)}px`;
  }, [value]);

  const submit = () => {
    if (!canSend) {
      return;
    }
    const next = value.trim();
    setValue('');
    onSend(next);
    onSubmitted?.();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  };

  return { value, setValue, textareaRef, canSend, submit, onKeyDown };
}
