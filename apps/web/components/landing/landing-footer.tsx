import Link from 'next/link';

import { BrandMark } from '@/components/landing/brand-mark';

export function LandingFooter() {
  return (
    <footer className="border-border/70 bg-background border-t">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-start md:justify-between md:px-8">
        <div className="max-w-sm">
          <BrandMark />
          <p className="text-muted-foreground mt-4 text-[14px] leading-relaxed">
            AskDocs helps you upload documents and ask questions in chat — answers grounded in your
            files, not a generic web search.
          </p>
        </div>

        <div className="flex gap-10 text-[14px]">
          <div className="flex flex-col gap-2">
            <p className="text-foreground font-semibold tracking-tight">Product</p>
            <Link href="/signup" className="text-muted-foreground hover:text-foreground">
              Get started
            </Link>
            <Link href="/login" className="text-muted-foreground hover:text-foreground">
              Log in
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-foreground font-semibold tracking-tight">App</p>
            <Link href="/chats" className="text-muted-foreground hover:text-foreground">
              Chats
            </Link>
          </div>
        </div>
      </div>

      <div className="border-border/70 border-t">
        <p className="text-muted-foreground mx-auto max-w-6xl px-6 py-5 text-[13px] md:px-8">
          © {new Date().getFullYear()} AskDocs
        </p>
      </div>
    </footer>
  );
}
