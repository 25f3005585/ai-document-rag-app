const STEPS = [
  {
    title: 'Upload what you already have',
    body: 'Attach PDFs, Word docs, Markdown, CSV, and other common formats to a chat. Keep related files together when a question spans more than one document.',
  },
  {
    title: 'Ask in plain language',
    body: 'Type the question you would ask a colleague: summarize a section, compare two clauses, pull dates, find who owns a decision, or explain a dense paragraph.',
  },
  {
    title: 'Read answers with sources',
    body: 'Responses stay grounded in the files you attached. Source pointers help you jump back to the original page or section instead of trusting a black box.',
  },
] as const;

export function LandingSteps() {
  return (
    <section className="border-border/70 border-b">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <h2 className="text-foreground text-[32px] leading-[1.15] font-bold tracking-[-0.035em] md:text-[40px] md:tracking-[-0.04em]">
            How AskDocs works
          </h2>
          <p className="text-muted-foreground mt-4 text-[16px] leading-relaxed md:text-[17px]">
            The loop is intentionally small. You bring the documents, AskDocs turns them into a
            conversation you can actually use — without turning into another all-in-one workspace.
          </p>
        </div>

        <ol className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          {STEPS.map((step, index) => (
            <li
              key={step.title}
              className="border-border bg-card rounded-xl border p-6 shadow-soft md:p-7"
            >
              <span className="text-muted-foreground text-[12px] font-semibold tracking-widest uppercase">
                Step {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-foreground mt-3 text-[20px] leading-snug font-semibold tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
