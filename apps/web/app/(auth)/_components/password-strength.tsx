import { Check, X } from 'lucide-react';

import { authHelperClass } from '@/app/(auth)/_components/auth-ui';

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
    <ul className={`${authHelperClass} -mt-1 space-y-1.5`}>
      {checks.map((check) => {
        const passed = check.test(password);
        return (
          <li key={check.key} className="flex items-center gap-2">
            {passed ? (
              <Check className="text-foreground/70 size-3.5 shrink-0" />
            ) : (
              <X className="text-muted-foreground/60 size-3.5 shrink-0" />
            )}
            <span className={passed ? 'text-foreground/80' : 'text-muted-foreground'}>
              {check.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
