import { ArrowUp, FileText, Paperclip } from 'lucide-react';

const MOCK_COLUMN = 'mx-auto w-full max-w-3xl px-5 sm:px-6';

/** Product mock in a mac-style window — mirrors real chat chrome. */
export function ChatMock() {
  return (
    <div className="chat-rise-in" style={{ animationDelay: '120ms' }} aria-hidden>
      <div className="border-border bg-card overflow-hidden rounded-2xl border shadow-soft">
        <MacTitleBar title="Q3 revenue drivers" />
        <MockThread />
        <MockComposer />
      </div>
    </div>
  );
}

function MockThread() {
  return (
    <div className={`${MOCK_COLUMN} space-y-5 py-5 sm:py-6`}>
      <div className="flex flex-col items-end gap-2">
        <div className="flex flex-wrap justify-end gap-2">
          <FileChip
            name="board-notes.docx"
            meta="42 KB · indexed"
            tint="bg-[#e8f6ec] text-[#1aae39]"
          />
          <FileChip
            name="Q3-report.pdf"
            meta="1.2 MB · indexed"
            tint="bg-[#fff0e6] text-[#dd5b00]"
          />
        </div>
        <div className="bg-secondary/80 text-foreground w-fit max-w-full rounded-2xl rounded-br-md px-4 py-2.5 text-left text-[14px] leading-relaxed sm:text-[15px]">
          What were the top revenue drivers last quarter?
        </div>
      </div>

      <div className="text-left">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="bg-foreground text-background flex size-5 items-center justify-center rounded-[5px] text-[10px] font-bold">
            A
          </span>
          <span className="text-muted-foreground text-xs font-medium tracking-wide">AskDocs</span>
        </div>
        <p className="text-foreground text-[14px] leading-[1.65] sm:text-[15px]">
          Based on your Q3 report, the two largest drivers were expansion revenue from existing
          accounts and a seasonal uptick in professional services. Board notes call out the same
          pattern in the August review.
        </p>
        <div className="border-border/70 mt-4 space-y-2 border-t pt-4">
          <p className="text-muted-foreground text-[11px] font-semibold tracking-[0.08em] uppercase">
            Sources
          </p>
          <SourceRow title="Q3-report.pdf" snippet="Expansion ARR led growth in Q3…" page="p. 4" />
          <SourceRow
            title="board-notes.docx"
            snippet="August review: services spike noted…"
            page="§ 2"
          />
        </div>
      </div>
    </div>
  );
}

function MockComposer() {
  return (
    <div className="border-border/70 border-t py-3">
      <div className={MOCK_COLUMN}>
        <div className="border-border/80 bg-background rounded-[20px] border px-4 py-5 shadow-soft">
          <p className="text-muted-foreground min-h-10 text-left text-[14px] leading-relaxed">
            Ask about your documents…
          </p>
          <div className="mt-5 flex items-center justify-between gap-3">
            <span className="text-muted-foreground inline-flex items-center gap-1.5 text-[12px]">
              <Paperclip className="size-3.5" />
              <span className="hidden sm:inline">Add Attachment</span>
            </span>
            <span className="bg-foreground text-background flex size-8 items-center justify-center rounded-full">
              <ArrowUp className="size-4" strokeWidth={2.25} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MacTitleBar({ title }: { title: string }) {
  return (
    <div className="border-border/70 bg-muted/40 relative flex h-11 items-center border-b px-4">
      <div className="flex items-center gap-1.5" aria-hidden>
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
      </div>
      <p className="text-muted-foreground pointer-events-none absolute inset-x-0 text-center text-[12px] font-medium tracking-tight">
        {title}
      </p>
    </div>
  );
}

function FileChip({ name, meta, tint }: { name: string; meta: string; tint: string }) {
  return (
    <div className="border-border bg-muted/50 flex max-w-full items-center gap-2 rounded-xl border px-2.5 py-1.5">
      <span className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${tint}`}>
        <FileText className="size-3.5" />
      </span>
      <div className="min-w-0 text-left">
        <p className="text-foreground truncate text-[12px] font-medium leading-tight">{name}</p>
        <p className="text-muted-foreground text-[11px] leading-tight">{meta}</p>
      </div>
    </div>
  );
}

function SourceRow({ title, snippet, page }: { title: string; snippet: string; page: string }) {
  return (
    <div className="border-border bg-background flex gap-3 rounded-lg border px-3 py-2.5 text-left">
      <span className="bg-muted text-muted-foreground mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md">
        <FileText className="size-3.5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-foreground truncate text-[13px] font-medium">{title}</p>
        <p className="text-muted-foreground mt-0.5 line-clamp-1 text-[12px] leading-snug">
          {snippet}
        </p>
      </div>
      <span className="text-muted-foreground/70 mt-0.5 shrink-0 text-[11px] tabular-nums">
        {page}
      </span>
    </div>
  );
}
