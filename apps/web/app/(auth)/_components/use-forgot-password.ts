'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { requestPasswordReset } from '@/lib/auth-client';
import { RESET_PASSWORD_PATH, toAbsoluteCallbackUrl } from '@/lib/constants';
import type { ForgotPasswordFormData } from '@/lib/validations/auth';

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setFormError(null);

    const { error } = await requestPasswordReset({
      email: data.email,
      redirectTo: toAbsoluteCallbackUrl(RESET_PASSWORD_PATH),
    });

    if (error) {
      const message =
        error.status === 429
          ? 'Too many reset requests. Please try again in 15 minutes.'
          : error.message || 'Failed to send reset email. Please try again.';
      setFormError(message);
      setIsLoading(false);
      return;
    }

    setIsSent(true);
    toast.success('If an account exists, a reset link has been sent.');
    setIsLoading(false);
  };

  return { isLoading, isSent, formError, onSubmit };
}
