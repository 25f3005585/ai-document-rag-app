'use client';

import { Button } from '@repo/ui/components/button';
import { Sheet, SheetContent, SheetTitle } from '@repo/ui/components/sheet';
import { cn } from '@repo/ui/lib/utils';
import { Menu } from 'lucide-react';
import { useState } from 'react';

import { Sidebar } from '@/components/chats/sidebar';
import { useSidebarCollapsed } from '@/hooks/use-sidebar-collapsed';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { collapsed, toggle } = useSidebarCollapsed();

  return (
    <div className="bg-background flex h-svh overflow-hidden">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={toggle}
        className={cn(
          'border-sidebar-border bg-sidebar hidden shrink-0 border-r md:flex md:flex-col',
          'transition-[width] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[width]',
          collapsed ? 'w-[72px]' : 'w-[288px]',
        )}
      />

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          className="bg-sidebar w-[288px] gap-0 border-r p-0 sm:max-w-[288px]"
          showCloseButton={false}
        >
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Sidebar
            className="flex h-full flex-col"
            onNavigate={() => {
              setMobileOpen(false);
            }}
          />
        </SheetContent>
      </Sheet>

      <div className="bg-background flex min-w-0 flex-1 flex-col">
        <header className="border-border/70 bg-background/90 flex h-12 shrink-0 items-center gap-2.5 border-b px-3 backdrop-blur-md md:hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="Open menu"
            onClick={() => {
              setMobileOpen(true);
            }}
          >
            <Menu className="size-4" />
          </Button>
          <span className="text-sm font-semibold tracking-tight">AskDocs</span>
        </header>
        <main className="flex min-h-0 flex-1 flex-col">{children}</main>
      </div>
    </div>
  );
}
