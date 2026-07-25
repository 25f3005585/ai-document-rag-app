'use client';

import { Button } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';
import { MessageSquare, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';

import { useChatStore } from '@/lib/chats/store';
import type { Chat } from '@/lib/chats/types';

type ChatRowProps = {
  chat: Chat;
  onNavigate?: () => void;
};

export function ChatRow({ chat, onNavigate }: ChatRowProps) {
  const pathname = usePathname();
  const router = useRouter();
  const deleteChat = useChatStore((state) => state.deleteChat);
  const isActive = pathname === `/chats/${chat.id}`;

  const handleDelete = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    deleteChat(chat.id);
    if (isActive) {
      router.push('/chats');
    }
  };

  return (
    <div className="group relative">
      <Link
        href={`/chats/${chat.id}`}
        onClick={onNavigate}
        className={cn(
          'relative flex items-center gap-2.5 rounded-xl py-2 pr-9 pl-2.5 text-sm transition-colors',
          'text-sidebar-foreground/90 hover:bg-black/[0.04] dark:hover:bg-white/[0.05]',
          'focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none',
          isActive && 'bg-black/[0.06] font-medium dark:bg-white/[0.08]',
        )}
      >
        <MessageSquare className="text-muted-foreground size-3.5 shrink-0" aria-hidden />
        <span className="truncate">{chat.title}</span>
      </Link>
      <Button
        type="button"
        variant="ghost"
        size="icon-xs"
        aria-label={`Delete ${chat.title}`}
        className={cn(
          'text-muted-foreground absolute top-1/2 right-1 -translate-y-1/2 opacity-0 transition-opacity',
          'hover:text-foreground group-hover:opacity-100 focus-visible:opacity-100',
          isActive && 'opacity-100',
        )}
        onClick={handleDelete}
      >
        <Trash2 className="size-3.5" />
      </Button>
    </div>
  );
}
