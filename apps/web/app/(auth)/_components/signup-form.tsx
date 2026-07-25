'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@repo/ui/lib/utils';
import { useForm } from 'react-hook-form';

import { AuthFormFooter } from '@/app/(auth)/_components/auth-form-footer';
import { AuthFormHeader } from '@/app/(auth)/_components/auth-form-header';
import { authFormClass } from '@/app/(auth)/_components/auth-ui';
import { SignupFields } from '@/app/(auth)/_components/signup-fields';
import { SocialProviders } from '@/app/(auth)/_components/social-providers';
import { useEmailSignup } from '@/app/(auth)/_components/use-email-signup';
import { DEFAULT_REDIRECT_PATH } from '@/lib/constants';
import { type SignupFormData, signupSchema } from '@/lib/validations/auth';

interface SignupFormProps extends Omit<React.ComponentProps<'form'>, 'onSubmit'> {
  callbackUrl?: string;
}

export function SignupForm({
  className,
  callbackUrl = DEFAULT_REDIRECT_PATH,
  ...props
}: SignupFormProps) {
  const { isLoading, signupError, onSubmit } = useEmailSignup(callbackUrl);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
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
      <AuthFormHeader
        title="Create your account"
        description="Fill in the form below to create your account"
      />

      <SignupFields
        register={register}
        errors={errors}
        password={watch('password') || ''}
        confirmPassword={watch('confirmPassword') || ''}
        isLoading={isLoading}
        signupError={signupError}
      />

      <SocialProviders mode="signup" callbackUrl={callbackUrl} />

      <AuthFormFooter
        text="Already have an account?"
        linkText="Sign in"
        linkHref={
          callbackUrl === DEFAULT_REDIRECT_PATH
            ? '/login'
            : `/login?callbackUrl=${encodeURIComponent(callbackUrl)}`
        }
      />
    </form>
  );
}
