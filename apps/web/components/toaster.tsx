'use client';

import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  const { resolvedTheme } = useTheme();

  return (
    <SonnerToaster
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      position="top-center"
      offset={24}
      gap={8}
      duration={4000}
      visibleToasts={3}
      expand={false}
      icons={{
        success: <CircleCheck className="size-4" strokeWidth={1.75} />,
        info: <Info className="size-4" strokeWidth={1.75} />,
        warning: <TriangleAlert className="size-4" strokeWidth={1.75} />,
        error: <CircleAlert className="size-4" strokeWidth={1.75} />,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast:
            'flex w-[min(22.5rem,calc(100vw-2rem))] items-start gap-3 rounded-xl border border-border/80 bg-popover/95 px-3.5 py-3 text-popover-foreground shadow-[0_1px_2px_rgb(0,0,0,0.04),0_8px_24px_rgb(0,0,0,0.08)] backdrop-blur-md dark:border-white/10 dark:shadow-[0_1px_2px_rgb(0,0,0,0.4),0_12px_32px_rgb(0,0,0,0.45)]',
          title: 'text-[13px] font-medium leading-snug tracking-tight text-foreground',
          description: 'mt-0.5 text-xs leading-relaxed text-muted-foreground',
          content: 'flex min-w-0 flex-1 flex-col',
          icon: 'mt-0.5 flex size-4 shrink-0 items-center justify-center text-muted-foreground',
          success:
            'border-l-[3px] border-l-emerald-500/80 [&_[data-icon]]:text-emerald-600 dark:[&_[data-icon]]:text-emerald-400',
          error: 'border-l-[3px] border-l-destructive [&_[data-icon]]:text-destructive',
          warning:
            'border-l-[3px] border-l-amber-500/80 [&_[data-icon]]:text-amber-600 dark:[&_[data-icon]]:text-amber-400',
          info: 'border-l-[3px] border-l-sky-500/70 [&_[data-icon]]:text-sky-600 dark:[&_[data-icon]]:text-sky-400',
          actionButton:
            'mt-2 inline-flex h-7 shrink-0 items-center rounded-md bg-primary px-2.5 text-xs font-medium text-primary-foreground',
          cancelButton:
            'mt-2 inline-flex h-7 shrink-0 items-center rounded-md bg-muted px-2.5 text-xs font-medium text-muted-foreground',
        },
      }}
    />
  );
}
