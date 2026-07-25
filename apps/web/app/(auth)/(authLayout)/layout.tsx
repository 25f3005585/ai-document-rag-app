import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-svh overflow-hidden lg:grid-cols-2">
      <div className="flex h-svh flex-col overflow-hidden">
        <div className="flex shrink-0 justify-center gap-2 p-6 pb-4 md:justify-start md:px-10 md:pt-10">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md text-xs font-bold">
              A
            </div>
            AskDocs
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 md:px-10 md:pb-10">
          <div className="flex min-h-full items-center justify-center py-8">{children}</div>
        </div>
      </div>

      <div className="bg-muted relative hidden h-svh overflow-hidden lg:block">
        <Image
          src="/auth-panel.jpg"
          alt="Open documents and books on a desk"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/15 to-black/25" />
        
      </div>
    </div>
  );
};

export default AuthLayout;
