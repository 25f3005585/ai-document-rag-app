import { SignupForm } from '@/app/(auth)/_components/signup-form';
import { DEFAULT_REDIRECT_PATH, safeCallbackUrl } from '@/lib/constants';

interface SignupPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

const SignupPage = async ({ searchParams }: SignupPageProps) => {
  const params = await searchParams;
  const callbackUrl = safeCallbackUrl(params.callbackUrl) ?? DEFAULT_REDIRECT_PATH;

  return <SignupForm callbackUrl={callbackUrl} />;
};

export default SignupPage;
