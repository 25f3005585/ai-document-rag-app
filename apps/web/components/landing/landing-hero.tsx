import { Button } from '@repo/ui/components/button';
import { FileText } from 'lucide-react';
import Link from 'next/link';

import { ChatMock } from '@/components/landing/chat-mock';
import {
  landingPrimaryBtnClass,
  landingSecondaryBtnClass,
} from '@/components/landing/landing-cta-styles';

export function LandingHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pt-14 pb-8 md:px-8 md:pt-20 md:pb-14">
        <div className="chat-rise-in mx-auto max-w-3xl text-center">
          <span className="border-border bg-card text-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-medium tracking-tight shadow-soft">
            <span className="bg-muted flex size-5 items-center justify-center rounded-md">
              <FileText className="text-muted-foreground size-3" aria-hidden />
            </span>
            Chat with your files
          </span>

          <h1 className="text-foreground mt-5 font-bold">
            <span className="block text-[44px] leading-[1.02] tracking-[-1.6px] md:text-[68px] md:tracking-[-2.4px]">
              Ask your documents
            </span>
            <span className="text-muted-foreground/55 block text-[44px] leading-[1.02] tracking-[-1.6px] md:text-[68px] md:tracking-[-2.4px]">
              anything.
            </span>
          </h1>

          <p className="text-muted-foreground mx-auto mt-6 max-w-xl text-[17px] leading-[1.55] md:text-[18px]">
            Upload PDFs, Word files, or text. Ask in a chat. Get answers grounded in what you
            uploaded — with the source in view.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild className={landingPrimaryBtnClass}>
              <Link href="/signup">Get started</Link>
            </Button>
            <Button asChild variant="outline" className={landingSecondaryBtnClass}>
              <Link href="/login">Log in</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl md:max-w-5xl">
          <ChatMock />
        </div>
      </div>
    </section>
  );
}
