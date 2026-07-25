import { CHAT_COLUMN } from '@/lib/chats/layout';

type ChatHeaderProps = {
  title: string;
};

export function ChatHeader({ title }: ChatHeaderProps) {
  return (
    <header className="border-border/70 bg-background/75 supports-backdrop-filter:backdrop-blur-md sticky top-0 z-10 border-b py-3">
      <div className={CHAT_COLUMN}>
        <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.08em] uppercase">
          Conversation
        </p>
        <h1 className="text-foreground truncate text-[15px] font-semibold tracking-tight">
          {title}
        </h1>
      </div>
    </header>
  );
}
