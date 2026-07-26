const USE_CASES = [
  {
    title: 'Reports and research',
    body: 'Paste a long PDF and ask for the thesis, risks, numbers, or open questions — then follow up without re-reading the whole file.',
  },
  {
    title: 'Contracts and policies',
    body: 'Ask where liability sits, what a notice period is, or whether two documents contradict each other. Keep the clause reference in view.',
  },
  {
    title: 'Notes and meetings',
    body: 'Turn messy notes into decisions, owners, and next steps. Ask what was deferred, who promised what, and what still needs an answer.',
  },
  {
    title: 'Spreadsheets and exports',
    body: 'Upload CSVs or exported tables and ask for trends, outliers, or a plain-English readout of a column you do not want to filter by hand.',
  },
] as const;

export function LandingUseCases() {
  return (
    <section className="border-border/70 border-b">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-foreground text-[32px] leading-[1.15] font-bold tracking-[-0.035em] md:text-[40px] md:tracking-[-0.04em]">
            Built for real document questions
          </h2>
          <p className="text-muted-foreground mt-4 text-[16px] leading-relaxed md:text-[17px]">
            People do not open AskDocs to browse a library. They open it because something in a file
            is unclear, buried, or too long to skim. These are the kinds of jobs it is meant for.
          </p>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2">
          {USE_CASES.map((item) => (
            <li key={item.title} className="border-border bg-card rounded-xl border p-6 md:p-7">
              <h3 className="text-foreground text-[18px] font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="text-muted-foreground mt-2.5 text-[15px] leading-relaxed">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
