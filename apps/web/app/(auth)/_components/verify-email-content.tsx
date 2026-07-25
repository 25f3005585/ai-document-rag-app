'use client';

import { Button } from '@repo/ui/components/button';
import { Field, FieldGroup } from '@repo/ui/components/field';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

import { AuthFormFooter } from '@/app/(auth)/_components/auth-form-footer';
import { AuthFormHeader } from '@/app/(auth)/_components/auth-form-header';
import { sendVerificationEmail } from '@/lib/auth-client';
import { DEFAULT_REDIRECT_PATH, toAbsoluteCallbackUrl } from '@/lib/constants';

interface VerifyEmailContentProps {
  email: string;
  callbackUrl?: string;
}

export function VerifyEmailContent({
  email,
  callbackUrl = DEFAULT_REDIRECT_PATH,
}: VerifyEmailContentProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleResend = () => {
    void (async () => {
      setIsLoading(true);
      try {
        const result = await sendVerificationEmail({
          email,
          callbackURL: toAbsoluteCallbackUrl(callbackUrl),
        });
        if (result.error) {
          toast.error(result.error.message || 'Failed to resend verification email.');
          return;
        }
        toast.success(`Verification email sent to ${email}.`);
      } catch {
        toast.error('Failed to resend verification email.');
      } finally {
        setIsLoading(false);
      }
    })();
  };

  return (
    <FieldGroup>
      <AuthFormHeader
        title="Verify your email"
        description={`We sent a verification link to ${email || 'your inbox'}. Open it to activate your account.`}
      />

      <Field>
        <Button
          type="button"
          className="w-full"
          disabled={isLoading || !email}
          onClick={handleResend}
        >
          {isLoading ? 'Sending...' : 'Resend verification email'}
        </Button>
      </Field>

      <p className="text-muted-foreground text-center text-sm">
        Already verified?{' '}
        <Link href="/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </p>

      <AuthFormFooter text="Wrong email?" linkText="Create another account" linkHref="/signup" />
    </FieldGroup>
  );
}
