'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';
import { useForm } from 'react-hook-form';

import { AuthFormFooter } from '@/app/(auth)/_components/auth-form-footer';
import { AuthFormHeader } from '@/app/(auth)/_components/auth-form-header';
import { AuthTextField } from '@/app/(auth)/_components/auth-text-field';
import {
  authButtonClass,
  authFieldsClass,
  authFormClass,
  authHelperClass,
} from '@/app/(auth)/_components/auth-ui';
import { FormErrorBanner } from '@/app/(auth)/_components/form-error-banner';
import { useForgotPassword } from '@/app/(auth)/_components/use-forgot-password';
import { type ForgotPasswordFormData, forgotPasswordSchema } from '@/lib/validations/auth';

export function ForgotPasswordForm({ className, ...props }: React.ComponentProps<'form'>) {
  const { isLoading, isSent, formError, onSubmit } = useForgotPassword();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  if (isSent) {
    return (
      <div className={cn(authFormClass, className)}>
        <AuthFormHeader
          title="Check your email"
          description={`If an account exists for ${getValues('email')}, we sent a password reset link.`}
        />
        <p className={`${authHelperClass} text-center`}>
          Didn&apos;t get it? Check spam, or try again in a few minutes.
        </p>
        <AuthFormFooter text="Remembered your password?" linkText="Sign in" linkHref="/login" />
      </div>
    );
  }

  return (
    <form
      className={cn(authFormClass, className)}
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
      {...props}
    >
      <AuthFormHeader
        title="Forgot password"
        description="Enter your email and we'll send you a reset link"
      />
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
        <FormErrorBanner message={formError} />
        <Button type="submit" disabled={isLoading} className={authButtonClass}>
          {isLoading ? 'Sending...' : 'Send reset link'}
        </Button>
      </div>
      <AuthFormFooter text="Remembered your password?" linkText="Sign in" linkHref="/login" />
    </form>
  );
}
