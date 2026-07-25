import { HomeAuthPanel } from '@/components/home-auth-panel';

export default function Page() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 p-6">
      <h1 className="text-3xl font-semibold tracking-tight">AskDocs</h1>
      <p className="text-muted-foreground text-sm">Ask your documents</p>
      <HomeAuthPanel />
    </main>
  );
}
