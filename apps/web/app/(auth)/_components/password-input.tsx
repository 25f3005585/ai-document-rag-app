'use client';

import { Input } from '@repo/ui/components/input';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import { authInputClass } from '@/app/(auth)/_components/auth-ui';

interface PasswordInputProps {
  id: string;
  registration: UseFormRegisterReturn;
  disabled?: boolean;
  invalid?: boolean;
  placeholder?: string;
}

export function PasswordInput({
  id,
  registration,
  disabled,
  invalid,
  placeholder = '••••••••',
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        id={id}
        type={visible ? 'text' : 'password'}
        placeholder={placeholder}
        {...registration}
        aria-invalid={invalid ? 'true' : 'false'}
        disabled={disabled}
        className={`${authInputClass} pr-10`}
      />
      <button
        type="button"
        onClick={() => {
          setVisible((current) => !current);
        }}
        className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-0 flex items-center pr-3"
        tabIndex={-1}
        aria-label={visible ? 'Hide password' : 'Show password'}
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}
