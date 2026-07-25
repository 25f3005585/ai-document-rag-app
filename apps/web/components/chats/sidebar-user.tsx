'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/avatar';
import { Button } from '@repo/ui/components/button';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { ThemeToggle } from '@/components/chats/theme-toggle';
import { authClient, signOut } from '@/lib/auth-client';
import { DEFAULT_AUTH_REDIRECT_PATH } from '@/lib/constants';

function initialsFrom(name?: string | null, email?: string | null): string {
  const source = name?.trim() || email?.trim() || 'U';
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? ''}`.toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

function UserAvatar({
  image,
  name,
  email,
}: {
  image?: string | null;
  name?: string | null;
  email?: string | null;
}) {
  return (
    <Avatar size="sm" className="size-8">
      {image ? <AvatarImage src={image} alt="" /> : null}
      <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
        {initialsFrom(name, email)}
      </AvatarFallback>
    </Avatar>
  );
}

type SidebarUserProps = {
  compact?: boolean;
};

export function SidebarUser({ compact = false }: SidebarUserProps) {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const displayName = user?.name.trim() || 'Account';
  const displayEmail = user?.email.trim() || (isPending ? 'Loading…' : 'Signed in');

  const handleSignOut = () => {
    void signOut().then(() => {
      router.replace(DEFAULT_AUTH_REDIRECT_PATH);
    });
  };

  if (compact) {
    return (
      <div className="flex flex-col items-center gap-2 pb-1">
        <ThemeToggle />
        <UserAvatar image={user?.image} name={user?.name} email={user?.email} />
      </div>
    );
  }

  return (
    <div className="border-sidebar-border mt-auto border-t p-2.5">
      <div className="flex items-center gap-2 rounded-xl p-1.5">
        <UserAvatar image={user?.image} name={user?.name} email={user?.email} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium tracking-tight">{displayName}</p>
          <p className="text-muted-foreground truncate text-xs">{displayEmail}</p>
        </div>
        <ThemeToggle />
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Sign out"
          className="text-muted-foreground hover:text-foreground"
          onClick={handleSignOut}
        >
          <LogOut className="size-4" />
        </Button>
      </div>
    </div>
  );
}
