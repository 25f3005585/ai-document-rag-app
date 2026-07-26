import Image from 'next/image';
import type React from 'react';

import { BrandMark } from '@/components/brand-mark';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid h-svh overflow-hidden lg:grid-cols-2">
      <div className="flex min-h-0 flex-col overflow-hidden">
        <header className="flex shrink-0 items-center px-6 pt-5 pb-2 md:px-8 md:pt-6">
          <BrandMark />
        </header>

        <main className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto px-6 py-4 md:px-8">
          {children}
        </main>
      </div>

      <aside className="bg-muted relative hidden overflow-hidden lg:block">
        <Image
          src="/auth-panel.jpg"
          alt="Open documents and books on a desk"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
      </aside>
    </div>
  );
};

export default AuthLayout;
