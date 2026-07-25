'use client';

import { Button } from '@repo/ui/components/button';
import { Checkbox } from '@repo/ui/components/checkbox';
import { Field, FieldLabel } from '@repo/ui/components/field';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import type { FieldErrors, UseFormRegister } from 'react-hook-form';

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
    <div className="flex flex-col gap-5">
      <Field>
        <FieldLabel htmlFor="email">Email</FieldLabel>
        <Input
          id="email"
          type="email"
          placeholder="m@example.com"
          autoComplete="email"
          {...register('email')}
          aria-invalid={errors.email ? 'true' : 'false'}
          disabled={isLoading}
        />
        {errors.email ? (
          <p className="text-destructive mt-1.5 text-sm">{errors.email.message}</p>
        ) : null}
      </Field>

      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <PasswordInput
          id="password"
          registration={register('password')}
          disabled={isLoading}
          invalid={Boolean(errors.password)}
        />
        {errors.password ? (
          <p className="text-destructive mt-1.5 text-sm">{errors.password.message}</p>
        ) : null}
      </Field>

      <div className="flex items-center gap-2 pt-0.5">
        <Checkbox
          id="remember-me"
          checked={rememberMe}
          onCheckedChange={(value) => {
            onRememberMeChange(value === true);
          }}
          disabled={isLoading}
        />
        <Label htmlFor="remember-me" className="font-normal">
          Remember me
        </Label>
      </div>

      <FormErrorBanner message={loginError} />

      <Field className="pt-1">
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Signing in...' : 'Login'}
        </Button>
      </Field>
    </div>
  );
}
