'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select';

import { type PersonalizationPrefs, TRAIT_OPTIONS, type TraitOption } from '@/lib/personalization';

type TraitsProps = {
  prefs: PersonalizationPrefs;
  onChange: (patch: Partial<PersonalizationPrefs>) => void;
};

const TRAITS: {
  key: keyof Pick<PersonalizationPrefs, 'warm' | 'enthusiastic' | 'headersLists' | 'emoji'>;
  label: string;
}[] = [
  { key: 'warm', label: 'Warm' },
  { key: 'enthusiastic', label: 'Enthusiastic' },
  { key: 'headersLists', label: 'Headers & lists' },
  { key: 'emoji', label: 'Emoji' },
];

export function PersonalizationTraits({ prefs, onChange }: TraitsProps) {
  return (
    <div className="border-border border-t pt-5">
      <p className="text-sm font-medium tracking-tight">Characteristics</p>
      <p className="text-muted-foreground mt-0.5 mb-3 text-xs leading-relaxed">
        Extra dials on top of your base style.
      </p>
      <ul className="flex flex-col gap-2.5">
        {TRAITS.map((trait) => (
          <li key={trait.key} className="flex items-center justify-between gap-3">
            <span className="text-sm">{trait.label}</span>
            <Select
              value={prefs[trait.key]}
              onValueChange={(value) => {
                onChange({ [trait.key]: value as TraitOption });
              }}
            >
              <SelectTrigger size="sm" className="w-[7.5rem] rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                {TRAIT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </li>
        ))}
      </ul>
    </div>
  );
}
