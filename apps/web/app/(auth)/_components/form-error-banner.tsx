interface FormErrorBannerProps {
  message: string | null;
}

export function FormErrorBanner({ message }: FormErrorBannerProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="border-destructive/25 bg-destructive/10 rounded-lg border px-3 py-2.5">
      <p className="text-destructive text-center text-xs leading-relaxed">{message}</p>
    </div>
  );
}
