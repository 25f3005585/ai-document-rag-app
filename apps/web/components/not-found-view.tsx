import { Button } from '@repo/ui/components/button';
import { FileQuestion } from 'lucide-react';
import Link from 'next/link';

import { DEFAULT_REDIRECT_PATH } from '@/lib/constants';

const STICKERS = [
  { className: 'bg-[#d6b6f6] top-3 left-4 size-2.5', delay: '0ms' },
  { className: 'bg-[#ff64c8] top-8 right-6 size-2', delay: '80ms' },
  { className: 'bg-[#2a9d99] bottom-10 left-8 size-2', delay: '140ms' },
  { className: 'bg-[#62aef0] bottom-6 right-4 size-2.5', delay: '200ms' },
  { className: 'bg-[#1aae39] top-1/2 right-2 size-1.5', delay: '260ms' },
] as const;

export function NotFoundView() {
  return (
    <div className="bg-background flex min-h-svh flex-col">
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

      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-16">
        <div className="chat-rise-in relative mx-auto w-full max-w-md text-center">
          <MissingDocMark />

          <p className="text-muted-foreground mt-10 text-xs font-semibold tracking-[0.08em] uppercase">
            Error 404
          </p>
          <h1 className="text-foreground mt-2 text-[40px] leading-[1.1] font-bold tracking-[-0.04em] md:text-[54px] md:tracking-[-0.035em]">
            Page not found
          </h1>
          <p className="text-muted-foreground mx-auto mt-3 max-w-sm text-[15px] leading-relaxed">
            This link doesn&apos;t lead anywhere. The page may have moved, been removed, or never
            existed.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="h-10 rounded-full px-5 text-sm font-medium active:scale-[0.97]"
            >
              <Link href="/">Back to AskDocs</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-border bg-card text-foreground h-10 rounded-full px-5 text-sm font-medium shadow-soft active:scale-[0.97]"
            >
              <Link href={DEFAULT_REDIRECT_PATH}>Go to chats</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

function MissingDocMark() {
  return (
    <div className="relative mx-auto flex h-36 w-44 items-center justify-center" aria-hidden>
      {STICKERS.map((dot) => (
        <span
          key={dot.className}
          className={`chat-fade-in absolute rounded-full ${dot.className}`}
          style={{ animationDelay: dot.delay }}
        />
      ))}

      <div className="border-border bg-card relative flex size-30 rotate-[-4deg] flex-col overflow-hidden rounded-xl border shadow-soft">
        <div className="flex h-7 items-center gap-1.5 bg-[#213183] px-2.5">
          <span className="size-1.5 rounded-full bg-white/40" />
          <span className="size-1.5 rounded-full bg-white/40" />
          <span className="size-1.5 rounded-full bg-white/40" />
        </div>
        <div className="flex flex-1 flex-col justify-center gap-1.5 px-3.5 py-3">
          <span className="bg-muted h-1.5 w-3/4 rounded-full" />
          <span className="bg-muted h-1.5 w-full rounded-full" />
          <span className="bg-muted h-1.5 w-5/6 rounded-full" />
          <span className="bg-muted mt-1 h-1.5 w-1/2 rounded-full" />
        </div>
      </div>

      <div className="border-border bg-card absolute right-2 bottom-2 flex size-11 rotate-[8deg] items-center justify-center rounded-xl border shadow-soft">
        <FileQuestion className="text-muted-foreground size-5" strokeWidth={1.75} />
      </div>
    </div>
  );
}
