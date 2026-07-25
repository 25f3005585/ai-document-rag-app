interface FormErrorBannerProps {
  message: string | null;
}

export function FormErrorBanner({ message }: FormErrorBannerProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="border-destructive/30 bg-destructive/10 rounded-lg border p-3">
      <p className="text-destructive text-center text-sm font-medium">{message}</p>
    </div>
  );
}
