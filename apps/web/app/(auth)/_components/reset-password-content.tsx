'use client';

import Link from 'next/link';

import { AuthFormHeader } from '@/app/(auth)/_components/auth-form-header';
import { authFormClass, authHelperClass } from '@/app/(auth)/_components/auth-ui';
import { ResetPasswordForm } from '@/app/(auth)/_components/reset-password-form';
import { FORGOT_PASSWORD_PATH } from '@/lib/constants';

interface ResetPasswordContentProps {
  token: string | null;
  error: string | null;
}

export function ResetPasswordContent({ token, error }: ResetPasswordContentProps) {
  if (!token || error === 'INVALID_TOKEN') {
    return (
      <div className={authFormClass}>
        <AuthFormHeader
          title="Invalid or expired link"
          description="This password reset link is invalid or has expired. Request a new one to continue."
        />
        <p className={`${authHelperClass} text-center`}>
          <Link
            href={FORGOT_PASSWORD_PATH}
            className="text-foreground font-medium underline-offset-4 hover:underline"
          >
            Request a new reset link
          </Link>
        </p>
      </div>
    );
  }

  return <ResetPasswordForm token={token} />;
}
