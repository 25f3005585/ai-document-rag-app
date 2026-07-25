'use client';

import { cn } from '@repo/ui/lib/utils';
import { MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

import { ChatRowMenu } from '@/components/chats/chat-row-menu';
import { ChatRowRename } from '@/components/chats/chat-row-rename';
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
  const renameChat = useChatStore((state) => state.renameChat);
  const [renaming, setRenaming] = useState(false);
  const isActive = pathname === `/chats/${chat.id}`;

  const handleDelete = () => {
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
      {renaming ? (
        <ChatRowRename
          title={chat.title}
          onSave={(title) => {
            renameChat(chat.id, title);
            setRenaming(false);
          }}
          onCancel={() => {
            setRenaming(false);
          }}
        />
      ) : (
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
      )}
      {renaming ? null : (
        <ChatRowMenu
          title={chat.title}
          visible={isActive}
          onRename={() => {
            // Wait for the menu to close so the input can take focus.
            window.setTimeout(() => {
              setRenaming(true);
            }, 0);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
