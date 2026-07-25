'use client';

import { Button } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { ChatList } from '@/components/chats/chat-list';
import { CollapsedSidebarActions, SidebarHeader } from '@/components/chats/sidebar-header';
import { SidebarUser } from '@/components/chats/sidebar-user';
import { useChatStore } from '@/lib/chats/store';

type SidebarProps = {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onNavigate?: () => void;
  className?: string;
};

export function Sidebar({
  collapsed = false,
  onToggleCollapse,
  onNavigate,
  className,
}: SidebarProps) {
  const router = useRouter();
  const createChat = useChatStore((state) => state.createChat);

  const handleNewChat = () => {
    const id = createChat();
    onNavigate?.();
    router.push(`/chats/${id}`);
  };

  return (
    <aside className={cn('overflow-hidden', className)}>
      <div
        className={cn('flex h-full min-h-0 flex-col', collapsed ? 'items-center px-2 py-3' : '')}
      >
        <SidebarHeader
          collapsed={collapsed}
          onNavigate={onNavigate}
          onToggleCollapse={onToggleCollapse}
        />

        {collapsed ? (
          <>
            <CollapsedSidebarActions
              onNewChat={handleNewChat}
              onToggleCollapse={onToggleCollapse}
            />
            <div className="mt-auto">
              <SidebarUser compact />
            </div>
          </>
        ) : (
          <>
            <div className="px-4 pb-6">
              <Button
                type="button"
                variant="outline"
                className="border-border bg-card text-foreground hover:bg-muted/50 h-9 w-full justify-start gap-2 rounded-xl text-sm font-medium shadow-none"
                onClick={handleNewChat}
              >
                <Plus className="size-4" />
                New chat
              </Button>
            </div>
            <p className="text-muted-foreground px-5 pb-1 text-[11px] font-semibold tracking-[0.08em] uppercase">
              Recent
            </p>
            <ChatList onNavigate={onNavigate} />
            <SidebarUser />
          </>
        )}
      </div>
    </aside>
  );
}
