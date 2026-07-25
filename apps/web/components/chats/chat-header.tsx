type ChatHeaderProps = {
  title: string;
};

/** Squigglr-style top bar: full-bleed, title left. */
export function ChatHeader({ title }: ChatHeaderProps) {
  return (
    <header className="border-border/70 bg-background/80 supports-backdrop-filter:backdrop-blur-md sticky top-0 z-10 flex h-14 shrink-0 items-center border-b px-4 md:px-6">
      <h1 className="text-foreground min-w-0 flex-1 truncate text-[15px] font-semibold tracking-tight">
        {title}
      </h1>
    </header>
  );
}
