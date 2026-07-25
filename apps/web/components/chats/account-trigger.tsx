'use client';

import { cn } from '@repo/ui/lib/utils';
import { ChevronsUpDown } from 'lucide-react';

import { UserAvatar } from '@/components/chats/user-avatar';

type AccountTriggerProps = React.ComponentProps<'button'> & {
  compact?: boolean;
  image?: string | null;
  name?: string | null;
  email?: string | null;
  displayName: string;
  displayEmail: string;
};

export function AccountTrigger({
  ref,
  compact = false,
  image,
  name,
  email,
  displayName,
  displayEmail,
  className,
  ...props
}: AccountTriggerProps) {
  if (compact) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label="Account menu"
        className={cn(
          'hover:bg-sidebar-accent focus-visible:ring-sidebar-ring rounded-xl p-1.5',
          'outline-none focus-visible:ring-2 data-[state=open]:bg-sidebar-accent',
          className,
        )}
        {...props}
      >
        <UserAvatar image={image} name={name} email={email} />
      </button>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'hover:bg-sidebar-accent focus-visible:ring-sidebar-ring flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left',
        'outline-none transition-colors focus-visible:ring-2 data-[state=open]:bg-sidebar-accent',
        className,
      )}
      {...props}
    >
      <UserAvatar image={image} name={name} email={email} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium tracking-tight">{displayName}</p>
        <p className="text-muted-foreground truncate text-xs">{displayEmail}</p>
      </div>
      <ChevronsUpDown className="text-muted-foreground size-3.5 shrink-0" aria-hidden />
    </button>
  );
}
