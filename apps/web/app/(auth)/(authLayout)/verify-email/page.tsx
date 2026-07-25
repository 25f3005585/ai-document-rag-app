import { VerifyEmailContent } from '@/app/(auth)/_components/verify-email-content';
import { DEFAULT_REDIRECT_PATH, safeCallbackUrl } from '@/lib/constants';

interface VerifyEmailPageProps {
  searchParams: Promise<{ email?: string; callbackUrl?: string }>;
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {
  const params = await searchParams;
  const email = params.email?.trim() ?? '';
  const callbackUrl = safeCallbackUrl(params.callbackUrl) ?? DEFAULT_REDIRECT_PATH;

  return (
    <div className="mx-auto w-full max-w-sm">
      <VerifyEmailContent email={email} callbackUrl={callbackUrl} />
    </div>
  );
};

export default VerifyEmailPage;
