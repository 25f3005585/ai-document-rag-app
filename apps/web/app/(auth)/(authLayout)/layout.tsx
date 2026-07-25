import Image from 'next/image';
import Link from 'next/link';
import type React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex min-h-svh flex-col">
        <header className="flex shrink-0 items-center p-6 md:px-8 md:pt-8">
          <Link
            href="/"
            className="text-foreground flex items-center gap-2.5 text-sm font-semibold tracking-tight"
          >
            <span className="bg-foreground text-background flex size-7 items-center justify-center rounded-md text-xs font-bold">
              A
            </span>
            AskDocs
          </Link>
        </header>

        <main className="flex flex-1 items-center justify-center px-6 py-10 md:px-8">
          {children}
        </main>
      </div>

      <aside className="bg-muted relative hidden min-h-svh overflow-hidden lg:block">
        <Image
          src="/auth-panel.png"
          alt="Open documents and books on a desk"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        {/* <div className="absolute inset-x-0 bottom-0 p-10">
          <p className="text-sm font-semibold tracking-tight text-white">AskDocs</p>
          <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-white/75">
            Ask questions grounded in your documents.
          </p>
        </div> */}
      </aside>
    </div>
  );
};

export default AuthLayout;
