'use client';

import { Input } from '@repo/ui/components/input';
import { type FormEvent, type KeyboardEvent, useEffect, useRef, useState } from 'react';

type ChatRowRenameProps = {
  title: string;
  onSave: (title: string) => void;
  onCancel: () => void;
};

export function ChatRowRename({ title, onSave, onCancel }: ChatRowRenameProps) {
  const [value, setValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);
  const closedRef = useRef(false);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const finish = (action: () => void) => {
    if (closedRef.current) {
      return;
    }
    closedRef.current = true;
    action();
  };

  const commit = () => {
    const next = value.trim();
    if (!next || next === title) {
      finish(onCancel);
      return;
    }
    finish(() => {
      onSave(next);
    });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    commit();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      finish(onCancel);
    }
  };

  return (
    <form className="flex min-w-0 flex-1 items-center px-2 py-1" onSubmit={onSubmit}>
      <Input
        ref={inputRef}
        value={value}
        aria-label="Rename chat"
        className="h-8 rounded-md px-2 text-sm"
        onChange={(event) => {
          setValue(event.target.value);
        }}
        onBlur={commit}
        onKeyDown={onKeyDown}
      />
    </form>
  );
}
