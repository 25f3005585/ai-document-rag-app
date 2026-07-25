'use client';

import { Field, FieldLabel } from '@repo/ui/components/field';
import { Input } from '@repo/ui/components/input';
import { cn } from '@repo/ui/lib/utils';
import type { ReactNode } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

import {
  authErrorClass,
  authFieldClass,
  authHelperClass,
  authInputClass,
  authLabelClass,
} from '@/app/(auth)/_components/auth-ui';

interface AuthTextFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email';
  placeholder?: string;
  autoComplete?: string;
  registration: UseFormRegisterReturn;
  error?: string;
  disabled?: boolean;
}

export function AuthTextField({
  id,
  label,
  type = 'text',
  placeholder,
  autoComplete,
  registration,
  error,
  disabled,
}: AuthTextFieldProps) {
  return (
    <Field className={authFieldClass}>
      <FieldLabel htmlFor={id} className={authLabelClass}>
        {label}
      </FieldLabel>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...registration}
        aria-invalid={error ? 'true' : 'false'}
        disabled={disabled}
        className={authInputClass}
      />
      {error ? <p className={authErrorClass}>{error}</p> : null}
    </Field>
  );
}

interface AuthPasswordFieldShellProps {
  id: string;
  label: string;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
}

export function AuthPasswordFieldShell({
  id,
  label,
  error,
  hint,
  children,
}: AuthPasswordFieldShellProps) {
  return (
    <Field className={authFieldClass}>
      <FieldLabel htmlFor={id} className={authLabelClass}>
        {label}
      </FieldLabel>
      {children}
      {error ? <p className={authErrorClass}>{error}</p> : null}
      {!error && hint ? <div className={cn(authHelperClass, 'mt-1')}>{hint}</div> : null}
    </Field>
  );
}
