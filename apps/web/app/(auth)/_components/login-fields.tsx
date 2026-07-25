'use client';

import { Button } from '@repo/ui/components/button';
import { Checkbox } from '@repo/ui/components/checkbox';
import { Label } from '@repo/ui/components/label';
import Link from 'next/link';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

import { AuthPasswordFieldShell, AuthTextField } from '@/app/(auth)/_components/auth-text-field';
import { authButtonClass, authFieldsClass, authLabelClass } from '@/app/(auth)/_components/auth-ui';
import { FormErrorBanner } from '@/app/(auth)/_components/form-error-banner';
import { PasswordInput } from '@/app/(auth)/_components/password-input';
import type { LoginFormData } from '@/lib/validations/auth';

interface LoginFieldsProps {
  register: UseFormRegister<LoginFormData>;
  errors: FieldErrors<LoginFormData>;
  isLoading: boolean;
  loginError: string | null;
  rememberMe: boolean;
  onRememberMeChange: (checked: boolean) => void;
}

export function LoginFields({
  register,
  errors,
  isLoading,
  loginError,
  rememberMe,
  onRememberMeChange,
}: LoginFieldsProps) {
  return (
    <div className={authFieldsClass}>
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

      <AuthPasswordFieldShell id="password" label="Password" error={errors.password?.message}>
        <PasswordInput
          id="password"
          registration={register('password')}
          disabled={isLoading}
          invalid={Boolean(errors.password)}
        />
      </AuthPasswordFieldShell>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember-me"
            checked={rememberMe}
            onCheckedChange={(value) => {
              onRememberMeChange(value === true);
            }}
            disabled={isLoading}
          />
          <Label htmlFor="remember-me" className={`${authLabelClass} font-normal`}>
            Remember me
          </Label>
        </div>
        <Link
          href="/forgot-password"
          className={`${authLabelClass} font-medium underline-offset-4 hover:underline`}
        >
          Forgot password?
        </Link>
      </div>

      <FormErrorBanner message={loginError} />

      <Button type="submit" disabled={isLoading} className={authButtonClass}>
        {isLoading ? 'Signing in...' : 'Login'}
      </Button>
    </div>
  );
}
