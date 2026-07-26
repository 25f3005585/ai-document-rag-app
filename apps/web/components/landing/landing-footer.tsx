import { BrandMark } from '@/components/brand-mark';

export function LandingFooter() {
  return (
    <footer className="border-border/70 border-t">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-8 md:px-8">
        <BrandMark />
        <p className="text-muted-foreground text-[13px]">© {new Date().getFullYear()} AskDocs</p>
      </div>
    </footer>
  );
}
