'use client';

import { Button } from '@repo/ui/components/button';
import { Check } from 'lucide-react';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { AuthPasswordFieldShell, AuthTextField } from '@/app/(auth)/_components/auth-text-field';
import { authButtonClass, authFieldsClass } from '@/app/(auth)/_components/auth-ui';
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
    <div className={authFieldsClass}>
      <AuthTextField
        id="name"
        label="Full name"
        type="text"
        placeholder="John Doe"
        autoComplete="name"
        registration={register('name')}
        error={errors.name?.message}
        disabled={isLoading}
      />
      <AuthTextField
        id="email"
        label="Email"
        type="email"
        placeholder="m@example.com"
        autoComplete="email"
        registration={register('email')}
        error={errors.email?.message}
        disabled={isLoading}
      />
      <SignupPasswordFields
        register={register}
        errors={errors}
        password={password}
        passwordsMatch={passwordsMatch}
        isLoading={isLoading}
      />
      <FormErrorBanner message={signupError} />
      <Button type="submit" disabled={isLoading} className={authButtonClass}>
        {isLoading ? 'Creating account...' : 'Create account'}
      </Button>
    </div>
  );
}

function SignupPasswordFields({
  register,
  errors,
  password,
  passwordsMatch,
  isLoading,
}: {
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
  password: string;
  passwordsMatch: boolean;
  isLoading: boolean;
}) {
  return (
    <>
      <AuthPasswordFieldShell id="password" label="Password" error={errors.password?.message}>
        <PasswordInput
          id="password"
          registration={register('password')}
          disabled={isLoading}
          invalid={Boolean(errors.password)}
        />
      </AuthPasswordFieldShell>
      <PasswordStrength password={password} />
      <AuthPasswordFieldShell
        id="confirmPassword"
        label="Confirm password"
        error={errors.confirmPassword?.message}
        hint={
          passwordsMatch ? (
            <span className="text-foreground/80 inline-flex items-center gap-1">
              <Check className="size-3" />
              Passwords match
            </span>
          ) : (
            'Please confirm your password'
          )
        }
      >
        <PasswordInput
          id="confirmPassword"
          registration={register('confirmPassword')}
          disabled={isLoading}
          invalid={Boolean(errors.confirmPassword)}
        />
      </AuthPasswordFieldShell>
    </>
  );
}
