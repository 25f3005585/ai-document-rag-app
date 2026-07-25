interface AuthFormHeaderProps {
  title: string;
  description: string;
}

export function AuthFormHeader({ title, description }: AuthFormHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2.5 text-center">
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      <p className="text-muted-foreground text-sm text-balance">{description}</p>
    </div>
  );
}
