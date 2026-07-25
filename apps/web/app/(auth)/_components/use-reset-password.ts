'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { resetPassword } from '@/lib/auth-client';
import type { ResetPasswordFormData } from '@/lib/validations/auth';

export function useResetPassword(token: string) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    setFormError(null);

    const { error } = await resetPassword({
      newPassword: data.password,
      token,
    });

    if (error) {
      const message = error.message || 'Failed to reset password. Please try again.';
      setFormError(message);
      setIsLoading(false);
      return;
    }

    toast.success('Password updated. You can sign in now.');
    router.push('/login');
  };

  return { isLoading, formError, onSubmit };
}
