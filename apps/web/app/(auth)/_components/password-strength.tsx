import { Check, X } from 'lucide-react';

interface PasswordStrengthProps {
  password: string;
}

const checks = [
  { key: 'length', label: 'At least 8 characters', test: (value: string) => value.length >= 8 },
  { key: 'uppercase', label: 'One uppercase letter', test: (value: string) => /[A-Z]/.test(value) },
  { key: 'lowercase', label: 'One lowercase letter', test: (value: string) => /[a-z]/.test(value) },
  { key: 'number', label: 'One number', test: (value: string) => /[0-9]/.test(value) },
] as const;

export function PasswordStrength({ password }: PasswordStrengthProps) {
  if (!password) {
    return null;
  }

  return (
    <div className="space-y-2">
      {checks.map((check) => {
        const passed = check.test(password);
        return (
          <div key={check.key} className="flex items-center gap-2 text-xs">
            {passed ? (
              <Check className="size-4 shrink-0 text-green-500" />
            ) : (
              <X className="text-destructive/70 size-4 shrink-0" />
            )}
            <span className={passed ? 'text-green-600 dark:text-green-400' : 'text-destructive'}>
              {check.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
