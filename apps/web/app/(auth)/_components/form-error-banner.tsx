import { CircleAlert } from 'lucide-react';

interface FormErrorBannerProps {
  message: string | null;
}

export function FormErrorBanner({ message }: FormErrorBannerProps) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      className="border-destructive/25 bg-destructive/10 flex items-start gap-2.5 rounded-lg border px-3 py-2.5"
    >
      <CircleAlert className="text-destructive mt-0.5 size-3.5 shrink-0" strokeWidth={1.75} />
      <p className="text-destructive text-xs leading-relaxed">{message}</p>
    </div>
  );
}
