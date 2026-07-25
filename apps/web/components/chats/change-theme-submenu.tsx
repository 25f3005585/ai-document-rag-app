'use client';

import {
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@repo/ui/components/dropdown-menu';
import { Monitor, Moon, Palette, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const MENU_ITEM =
  'gap-2 rounded-lg px-2.5 py-2 text-sm font-medium [&_svg]:size-4 [&_svg]:text-muted-foreground';

export function ChangeThemeSubmenu() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const current = mounted && theme ? theme : 'system';

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className={MENU_ITEM}>
        <Palette aria-hidden />
        Change theme
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="min-w-36 rounded-xl p-1 shadow-soft" sideOffset={6}>
        <DropdownMenuRadioGroup value={current} onValueChange={setTheme}>
          <DropdownMenuRadioItem value="light" className={MENU_ITEM}>
            <Sun aria-hidden />
            Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark" className={MENU_ITEM}>
            <Moon aria-hidden />
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system" className={MENU_ITEM}>
            <Monitor aria-hidden />
            System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}

export { MENU_ITEM as ACCOUNT_MENU_ITEM };
