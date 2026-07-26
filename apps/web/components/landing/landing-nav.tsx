import { Button } from '@repo/ui/components/button';
import Link from 'next/link';

import { landingNavPrimaryBtnClass } from '@/components/landing/landing-cta-styles';

export function LandingNav() {
  return (
    <header className="bg-background/90 sticky top-0 z-20 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:h-16 md:px-8">
        <Link
          href="/"
          className="text-foreground text-[15px] font-bold tracking-tight md:text-base"
        >
          AskDocs
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Button asChild variant="ghost" className="h-10 rounded-full px-4 text-sm font-medium">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild className={landingNavPrimaryBtnClass}>
            <Link href="/signup">Get started</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
