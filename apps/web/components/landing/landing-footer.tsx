export function LandingFooter() {
  return (
    <footer className="border-border/70 border-t">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-8 md:px-8">
        <p className="text-foreground text-[15px] font-bold tracking-tight">AskDocs</p>
        <p className="text-muted-foreground text-[13px]">© {new Date().getFullYear()} AskDocs</p>
      </div>
    </footer>
  );
}
