'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/components/dropdown-menu';
import { LogOut, Sparkles, UserRound } from 'lucide-react';

import { ACCOUNT_MENU_ITEM, ChangeThemeSubmenu } from '@/components/chats/change-theme-submenu';

type AccountMenuProps = {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'right' | 'bottom' | 'left';
  onProfile: () => void;
  onPersonalization: () => void;
  onSignOut: () => void;
};

export function AccountMenu({
  children,
  align = 'start',
  side = 'top',
  onProfile,
  onPersonalization,
  onSignOut,
}: AccountMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        align={align}
        side={side}
        sideOffset={8}
        className="w-56 rounded-xl p-1.5 shadow-soft"
      >
        <DropdownMenuItem
          className={ACCOUNT_MENU_ITEM}
          onSelect={() => {
            onProfile();
          }}
        >
          <UserRound aria-hidden />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          className={ACCOUNT_MENU_ITEM}
          onSelect={() => {
            onPersonalization();
          }}
        >
          <Sparkles aria-hidden />
          Personalization
        </DropdownMenuItem>
        <ChangeThemeSubmenu />
        <DropdownMenuSeparator className="bg-border my-1" />
        <DropdownMenuItem
          variant="destructive"
          className={ACCOUNT_MENU_ITEM}
          onSelect={() => {
            onSignOut();
          }}
        >
          <LogOut aria-hidden />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
