import { LandingCta } from '@/components/landing/landing-cta';
import { LandingFooter } from '@/components/landing/landing-footer';
import { LandingFormats } from '@/components/landing/landing-formats';
import { LandingHero } from '@/components/landing/landing-hero';
import { LandingNav } from '@/components/landing/landing-nav';
import { LandingSteps } from '@/components/landing/landing-steps';
import { LandingUseCases } from '@/components/landing/landing-use-cases';

export function LandingPage() {
  return (
    <div className="bg-background text-foreground flex min-h-svh flex-col">
      <LandingNav />
      <main className="flex-1">
        <LandingHero />
        <LandingSteps />
        <LandingUseCases />
        <LandingFormats />
        <LandingCta />
      </main>
      <LandingFooter />
    </div>
  );
}
