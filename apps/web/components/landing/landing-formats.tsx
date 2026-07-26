const FORMATS = [
  { label: 'PDF', detail: 'Reports, papers, manuals' },
  { label: 'Word', detail: '.doc and .docx' },
  { label: 'Text & Markdown', detail: '.txt, .md, notes' },
  { label: 'CSV', detail: 'Exports and tables' },
  { label: 'Slides', detail: '.pptx decks' },
  { label: 'Spreadsheets', detail: '.xlsx workbooks' },
] as const;

export function LandingFormats() {
  return (
    <section className="border-border/70 border-b">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-start md:gap-16 md:px-8 md:py-24">
        <div>
          <h2 className="text-foreground text-[32px] leading-[1.15] font-bold tracking-[-0.035em] md:text-[40px] md:tracking-[-0.04em]">
            Bring the files you already use
          </h2>
          <p className="text-muted-foreground mt-4 text-[16px] leading-relaxed md:text-[17px]">
            AskDocs is format-tolerant on purpose. Start with whatever is already on your drive —
            you should not need a special export step just to ask a question. Attach multiple files
            when the answer lives across documents.
          </p>
          <p className="text-muted-foreground mt-4 text-[15px] leading-relaxed">
            Attachments stay scoped to the chat you are in, so each conversation can carry its own
            set of sources without mixing contexts.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4">
          {FORMATS.map((format) => (
            <li
              key={format.label}
              className="border-border bg-card rounded-xl border px-4 py-4 shadow-soft sm:px-5 sm:py-5"
            >
              <p className="text-foreground text-[15px] font-semibold tracking-tight">
                {format.label}
              </p>
              <p className="text-muted-foreground mt-1 text-[13px] leading-snug">{format.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
