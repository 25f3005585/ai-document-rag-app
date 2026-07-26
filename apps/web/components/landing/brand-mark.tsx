import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';

type BrandMarkProps = {
  className?: string;
  href?: string;
};

export function BrandMark({ className, href = '/' }: BrandMarkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'text-foreground flex items-center gap-2.5 text-sm font-semibold tracking-tight',
        className,
      )}
    >
      <span className="bg-foreground text-background flex size-7 items-center justify-center rounded-md text-xs font-bold">
        A
      </span>
      AskDocs
    </Link>
  );
}
