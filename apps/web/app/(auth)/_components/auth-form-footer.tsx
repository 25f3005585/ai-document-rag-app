import Link from 'next/link';

import { authHelperClass } from '@/app/(auth)/_components/auth-ui';

interface AuthFormFooterProps {
  text: string;
  linkText: string;
  linkHref: string;
}

export function AuthFormFooter({ text, linkText, linkHref }: AuthFormFooterProps) {
  return (
    <p className={`${authHelperClass} text-center`}>
      {text}{' '}
      <Link
        href={linkHref}
        className="text-foreground font-medium underline-offset-4 hover:underline"
      >
        {linkText}
      </Link>
    </p>
  );
}
