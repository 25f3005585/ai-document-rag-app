import { ResetPasswordContent } from '@/app/(auth)/_components/reset-password-content';

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string; error?: string }>;
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  const params = await searchParams;

  return (
    <ResetPasswordContent
      token={params.token?.trim() || null}
      error={params.error?.trim() || null}
    />
  );
};

export default ResetPasswordPage;
