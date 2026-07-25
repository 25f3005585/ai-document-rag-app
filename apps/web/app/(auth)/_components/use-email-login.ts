'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { signIn } from '@/lib/auth-client';
import { toAbsoluteCallbackUrl, VERIFY_EMAIL_PATH } from '@/lib/constants';
import type { LoginFormData } from '@/lib/validations/auth';

interface UseEmailLoginOptions {
  callbackUrl: string;
  rememberMe: boolean;
}

export function useEmailLogin({ callbackUrl, rememberMe }: UseEmailLoginOptions) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError(null);

    await signIn.email(
      {
        email: data.email,
        password: data.password,
        rememberMe,
        callbackURL: toAbsoluteCallbackUrl(callbackUrl),
      },
      {
        onSuccess: () => {
          toast.success('Welcome back!');
          router.push(callbackUrl);
          router.refresh();
        },
        onError: (ctx) => {
          if (ctx.error.status === 403) {
            toast.warning('Please verify your email before logging in.');
            router.push(`${VERIFY_EMAIL_PATH}?email=${encodeURIComponent(data.email)}`);
            setIsLoading(false);
            return;
          }

          const message =
            ctx.error.status === 401
              ? 'Incorrect email or password.'
              : ctx.error.message || 'Login failed. Please try again.';
          setLoginError(message);
          toast.error(message);
          setIsLoading(false);
        },
      },
    );
  };

  return { isLoading, loginError, onSubmit };
}
