'use client';

import { Button } from '@repo/ui/components/button';
import { Field, FieldDescription, FieldLabel } from '@repo/ui/components/field';
import { Input } from '@repo/ui/components/input';
import { Check } from 'lucide-react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { FormErrorBanner } from '@/app/(auth)/_components/form-error-banner';
import { PasswordInput } from '@/app/(auth)/_components/password-input';
import { PasswordStrength } from '@/app/(auth)/_components/password-strength';
import type { SignupFormData } from '@/lib/validations/auth';

interface SignupFieldsProps {
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  signupError: string | null;
}

export function SignupFields({
  register,
  errors,
  password,
  confirmPassword,
  isLoading,
  signupError,
}: SignupFieldsProps) {
  const passwordsMatch = Boolean(password && confirmPassword && password === confirmPassword);

  return (
    <div className="flex flex-col gap-5">
      <TextField
        id="name"
        label="Full Name"
        type="text"
        placeholder="John Doe"
        autoComplete="name"
        registration={register('name')}
        error={errors.name?.message}
        disabled={isLoading}
      />
      <TextField
        id="email"
        label="Email"
        type="email"
        placeholder="m@example.com"
        autoComplete="email"
        registration={register('email')}
        error={errors.email?.message}
        disabled={isLoading}
      />
      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <PasswordInput
          id="password"
          registration={register('password')}
          disabled={isLoading}
          invalid={Boolean(errors.password)}
        />
        <FieldError message={errors.password?.message} />
      </Field>
      <PasswordStrength password={password} />
      <ConfirmPasswordField
        register={register}
        error={errors.confirmPassword?.message}
        passwordsMatch={passwordsMatch}
        isLoading={isLoading}
      />
      <FormErrorBanner message={signupError} />
      <Field className="pt-1">
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </Field>
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }
  return <p className="text-destructive mt-1 text-sm">{message}</p>;
}

function TextField({
  id,
  label,
  type,
  placeholder,
  autoComplete,
  registration,
  error,
  disabled,
}: {
  id: string;
  label: string;
  type: 'text' | 'email';
  placeholder: string;
  autoComplete: string;
  registration: ReturnType<UseFormRegister<SignupFormData>>;
  error?: string;
  disabled: boolean;
}) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...registration}
        aria-invalid={error ? 'true' : 'false'}
        disabled={disabled}
      />
      <FieldError message={error} />
    </Field>
  );
}

function ConfirmPasswordField({
  register,
  error,
  passwordsMatch,
  isLoading,
}: {
  register: UseFormRegister<SignupFormData>;
  error?: string;
  passwordsMatch: boolean;
  isLoading: boolean;
}) {
  return (
    <Field>
      <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
      <PasswordInput
        id="confirmPassword"
        registration={register('confirmPassword')}
        disabled={isLoading}
        invalid={Boolean(error)}
      />
      {error ? (
        <FieldError message={error} />
      ) : passwordsMatch ? (
        <p className="mt-1 flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
          <Check className="size-3" />
          Passwords match
        </p>
      ) : (
        <FieldDescription>Please confirm your password</FieldDescription>
      )}
    </Field>
  );
}
