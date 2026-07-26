import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';

type BrandMarkProps = {
  className?: string;
  href?: string;
  onClick?: () => void;
};

/** Shared AskDocs mark — same treatment as the chats sidebar. */
export function BrandMark({ className, href = '/', onClick }: BrandMarkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'text-foreground flex items-center gap-2.5 text-sm font-semibold tracking-tight',
        className,
      )}
    >
      <span className="bg-foreground text-background flex size-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold">
        A
      </span>
      AskDocs
    </Link>
  );
}
