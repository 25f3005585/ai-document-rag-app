'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@repo/ui/lib/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { AuthFormFooter } from '@/app/(auth)/_components/auth-form-footer';
import { AuthFormHeader } from '@/app/(auth)/_components/auth-form-header';
import { LoginFields } from '@/app/(auth)/_components/login-fields';
import { SocialProviders } from '@/app/(auth)/_components/social-providers';
import { useEmailLogin } from '@/app/(auth)/_components/use-email-login';
import { DEFAULT_REDIRECT_PATH } from '@/lib/constants';
import { type LoginFormData, loginSchema } from '@/lib/validations/auth';

interface LoginFormProps extends Omit<React.ComponentProps<'form'>, 'onSubmit'> {
  callbackUrl?: string;
}

export default function LoginForm({
  className,
  callbackUrl = DEFAULT_REDIRECT_PATH,
  ...props
}: LoginFormProps) {
  const [rememberMe, setRememberMe] = useState(true);
  const { isLoading, loginError, onSubmit } = useEmailLogin({ callbackUrl, rememberMe });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  return (
    <form
      className={cn('flex w-full flex-col gap-8', className)}
      onSubmit={(event) => {
        void handleSubmit(onSubmit)(event);
      }}
      {...props}
    >
      <AuthFormHeader
        title="Login to your account"
        description="Enter your email below to login to your account"
      />

      <LoginFields
        register={register}
        errors={errors}
        isLoading={isLoading}
        loginError={loginError}
        rememberMe={rememberMe}
        onRememberMeChange={setRememberMe}
      />

      <SocialProviders mode="login" callbackUrl={callbackUrl} />

      <AuthFormFooter
        text="Don't have an account?"
        linkText="Sign up"
        linkHref={
          callbackUrl === DEFAULT_REDIRECT_PATH
            ? '/signup'
            : `/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`
        }
      />
    </form>
  );
}
