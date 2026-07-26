'use client';

import { Button } from '@repo/ui/components/button';
import { PanelLeft, PanelLeftClose, Plus } from 'lucide-react';
import Link from 'next/link';

type SidebarHeaderProps = {
  collapsed: boolean;
  onNavigate?: () => void;
  onToggleCollapse?: () => void;
};

export function SidebarHeader({ collapsed, onNavigate, onToggleCollapse }: SidebarHeaderProps) {
  if (collapsed) {
    return (
      <div className="flex w-full flex-col items-center gap-2 pt-1 pb-2">
        <Link
          href="/"
          onClick={onNavigate}
          aria-label="AskDocs home"
          className="bg-foreground text-background flex size-8 items-center justify-center rounded-xl text-[11px] font-bold"
        >
          A
        </Link>
      </div>
    );
  }

  return (
    <div className="flex w-full items-center gap-2 px-4 pt-5 pb-4">
      <Link
        href="/"
        onClick={onNavigate}
        className="text-foreground flex min-w-0 flex-1 items-center gap-2.5 text-sm font-semibold tracking-tight"
      >
        <span className="bg-foreground text-background flex size-7 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold">
          A
        </span>
        AskDocs
      </Link>
      {onToggleCollapse ? (
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          aria-label="Collapse sidebar"
          className="text-muted-foreground hover:text-foreground size-8 shrink-0"
          onClick={onToggleCollapse}
        >
          <PanelLeftClose className="size-4" />
        </Button>
      ) : null}
    </div>
  );
}

type CollapsedNewChatProps = {
  onNewChat: () => void;
  onToggleCollapse?: () => void;
};

export function CollapsedSidebarActions({ onNewChat, onToggleCollapse }: CollapsedNewChatProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label="New chat"
        className="text-foreground size-9 rounded-xl"
        onClick={onNewChat}
      >
        <Plus className="size-5" />
      </Button>
      {onToggleCollapse ? (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Expand sidebar"
          className="text-muted-foreground size-9 rounded-xl"
          onClick={onToggleCollapse}
        >
          <PanelLeft className="size-4" />
        </Button>
      ) : null}
    </div>
  );
}
