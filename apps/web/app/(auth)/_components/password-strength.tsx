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
    <ul className={`${authHelperClass} -mt-0.5 grid grid-cols-1 gap-1 sm:grid-cols-2`}>
      {checks.map((check) => {
        const passed = check.test(password);
        return (
          <li key={check.key} className="flex items-center gap-1.5">
            {passed ? (
              <Check className="text-primary size-3.5 shrink-0" aria-hidden />
            ) : (
              <X className="text-muted-foreground/55 size-3.5 shrink-0" aria-hidden />
            )}
            <span className={passed ? 'text-foreground/85' : 'text-muted-foreground'}>
              {check.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
