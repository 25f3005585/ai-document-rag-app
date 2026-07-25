'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { signUp } from '@/lib/auth-client';
import { toAbsoluteCallbackUrl, VERIFY_EMAIL_PATH } from '@/lib/constants';
import type { SignupFormData } from '@/lib/validations/auth';

export function useEmailSignup(callbackUrl: string) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [signupError, setSignupError] = useState<string | null>(null);

  const onSubmit = async (data: SignupFormData) => {
    setIsLoading(true);
    setSignupError(null);

    await signUp.email(
      {
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL: toAbsoluteCallbackUrl(callbackUrl),
      },
      {
        onSuccess: () => {
          toast.success(`Check ${data.email} to verify your account.`);
          router.push(`${VERIFY_EMAIL_PATH}?email=${encodeURIComponent(data.email)}`);
          setIsLoading(false);
        },
        onError: (ctx) => {
          const message = ctx.error.message || 'Signup failed. Please try again.';
          setSignupError(message);
          setIsLoading(false);
        },
      },
    );
  };

  return { isLoading, signupError, onSubmit };
}
