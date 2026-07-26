interface AuthFormHeaderProps {
  title: string;
  description: string;
}

export function AuthFormHeader({ title, description }: AuthFormHeaderProps) {
  return (
    <div className="flex flex-col gap-1.5 text-center">
      <h1 className="text-foreground text-xl font-semibold tracking-tight">{title}</h1>
      <p className="text-muted-foreground text-sm leading-snug">{description}</p>
    </div>
  );
}
