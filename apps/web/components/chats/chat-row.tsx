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
    <div
      className={cn(
        'group flex items-center gap-0.5 rounded-lg transition-colors',
        isActive ? 'bg-muted' : 'hover:bg-muted/60',
      )}
    >
      <Link
        href={`/chats/${chat.id}`}
        onClick={onNavigate}
        className={cn(
          'flex min-w-0 flex-1 items-center gap-2.5 px-3 py-2.5 text-sm',
          'focus-visible:ring-ring rounded-lg focus-visible:ring-2 focus-visible:outline-none',
          isActive ? 'text-foreground font-medium' : 'text-sidebar-foreground/90',
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
          'text-muted-foreground mr-1.5 shrink-0 opacity-0 transition-opacity',
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
