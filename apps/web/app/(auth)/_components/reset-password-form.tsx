'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';
import { useForm } from 'react-hook-form';

import { AuthFormFooter } from '@/app/(auth)/_components/auth-form-footer';
import { AuthFormHeader } from '@/app/(auth)/_components/auth-form-header';
import { AuthPasswordFieldShell } from '@/app/(auth)/_components/auth-text-field';
import { authButtonClass, authFieldsClass, authFormClass } from '@/app/(auth)/_components/auth-ui';
import { FormErrorBanner } from '@/app/(auth)/_components/form-error-banner';
import { PasswordInput } from '@/app/(auth)/_components/password-input';
import { PasswordStrength } from '@/app/(auth)/_components/password-strength';
import { useResetPassword } from '@/app/(auth)/_components/use-reset-password';
import { type ResetPasswordFormData, resetPasswordSchema } from '@/lib/validations/auth';

interface ResetPasswordFormProps extends Omit<React.ComponentProps<'form'>, 'onSubmit'> {
  token: string;
}

export function ResetPasswordForm({ token, className, ...props }: ResetPasswordFormProps) {
  const { isLoading, formError, onSubmit } = useResetPassword(token);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  return (
    <form
      className={cn(authFormClass, className)}
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
      {...props}
    >
      <AuthFormHeader title="Reset password" description="Choose a new password for your account" />
      <div className={authFieldsClass}>
        <AuthPasswordFieldShell id="password" label="New password" error={errors.password?.message}>
          <PasswordInput
            id="password"
            registration={register('password')}
            disabled={isLoading}
            invalid={Boolean(errors.password)}
          />
        </AuthPasswordFieldShell>
        <PasswordStrength password={watch('password') || ''} />
        <AuthPasswordFieldShell
          id="confirmPassword"
          label="Confirm password"
          error={errors.confirmPassword?.message}
        >
          <PasswordInput
            id="confirmPassword"
            registration={register('confirmPassword')}
            disabled={isLoading}
            invalid={Boolean(errors.confirmPassword)}
          />
        </AuthPasswordFieldShell>
        <FormErrorBanner message={formError} />
        <Button type="submit" disabled={isLoading} className={authButtonClass}>
          {isLoading ? 'Updating...' : 'Update password'}
        </Button>
      </div>
      <AuthFormFooter text="Back to" linkText="Sign in" linkHref="/login" />
    </form>
  );
}
