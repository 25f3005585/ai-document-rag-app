'use client';

import { PersonalizationBaseStyle } from '@/components/chats/personalization-base-style';
import { PersonalizationInstructions } from '@/components/chats/personalization-instructions';
import { PersonalizationTraits } from '@/components/chats/personalization-traits';
import type { PersonalizationPrefs } from '@/lib/personalization';

type StyleSectionProps = {
  prefs: PersonalizationPrefs;
  onChange: (patch: Partial<PersonalizationPrefs>) => void;
};

export function PersonalizationStyleSection({ prefs, onChange }: StyleSectionProps) {
  return (
    <section className="flex flex-col gap-5">
      <PersonalizationBaseStyle prefs={prefs} onChange={onChange} />
      <PersonalizationTraits prefs={prefs} onChange={onChange} />
      <PersonalizationInstructions prefs={prefs} onChange={onChange} />
    </section>
  );
}
