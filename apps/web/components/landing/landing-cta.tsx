import { Button } from '@repo/ui/components/button';
import Link from 'next/link';

import {
  landingPrimaryBtnClass,
  landingSecondaryBtnClass,
} from '@/components/landing/landing-cta-styles';

export function LandingCta() {
  return (
    <section className="border-border/70 bg-muted/40 border-b">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-20 md:flex-row md:items-center md:justify-between md:px-8 md:py-24">
        <div className="max-w-xl">
          <h2 className="text-foreground text-[32px] leading-[1.15] font-bold tracking-[-0.035em] md:text-[40px] md:tracking-[-0.04em]">
            Ready to ask your first document?
          </h2>
          <p className="text-muted-foreground mt-4 text-[16px] leading-relaxed md:text-[17px]">
            Create an account, upload a file, and ask the question you would normally spend twenty
            minutes hunting for.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button asChild className={landingPrimaryBtnClass}>
            <Link href="/signup">Get started free</Link>
          </Button>
          <Button asChild variant="outline" className={landingSecondaryBtnClass}>
            <Link href="/login">Log in</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
