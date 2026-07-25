import LoginForm from '@/app/(auth)/_components/login-form';
import { DEFAULT_REDIRECT_PATH, safeCallbackUrl } from '@/lib/constants';

interface LoginPageProps {
  searchParams: Promise<{ callbackUrl?: string }>;
}

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const params = await searchParams;
  const callbackUrl = safeCallbackUrl(params.callbackUrl) ?? DEFAULT_REDIRECT_PATH;

  return <LoginForm callbackUrl={callbackUrl} />;
};

export default LoginPage;
