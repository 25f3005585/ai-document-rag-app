'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/select';

import { type PersonalizationPrefs, STYLE_OPTIONS, type StyleOption } from '@/lib/personalization';

type ToneProps = {
  prefs: PersonalizationPrefs;
  onChange: (patch: Partial<PersonalizationPrefs>) => void;
};

export function PersonalizationBaseStyle({ prefs, onChange }: ToneProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium tracking-tight">Base style and tone</p>
        <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
          How AskDocs should sound in answers. This doesn&apos;t change what it can do.
        </p>
      </div>
      <Select
        value={prefs.style}
        onValueChange={(value) => {
          onChange({ style: value as StyleOption });
        }}
      >
        <SelectTrigger size="sm" className="shrink-0 rounded-lg">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-xl">
          {STYLE_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
