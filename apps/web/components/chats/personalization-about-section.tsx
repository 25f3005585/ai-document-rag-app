'use client';

import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { Textarea } from '@repo/ui/components/textarea';

import type { PersonalizationPrefs } from '@/lib/personalization';

type AboutSectionProps = {
  prefs: PersonalizationPrefs;
  onChange: (patch: Partial<PersonalizationPrefs>) => void;
};

export function PersonalizationAboutSection({ prefs, onChange }: AboutSectionProps) {
  return (
    <section className="border-border flex flex-col gap-4 border-t pt-5">
      <div>
        <p className="text-sm font-medium tracking-tight">About you</p>
        <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
          Optional context AskDocs can use to personalize answers.
        </p>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="pref-nickname" className="text-muted-foreground text-xs font-medium">
          Nickname
        </Label>
        <Input
          id="pref-nickname"
          value={prefs.nickname}
          onChange={(e) => {
            onChange({ nickname: e.target.value });
          }}
          className="rounded-xl"
          placeholder="What should we call you?"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="pref-occupation" className="text-muted-foreground text-xs font-medium">
          Occupation
        </Label>
        <Input
          id="pref-occupation"
          value={prefs.occupation}
          onChange={(e) => {
            onChange({ occupation: e.target.value });
          }}
          className="rounded-xl"
          placeholder="e.g. Full stack developer"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="pref-about" className="text-muted-foreground text-xs font-medium">
          More about you
        </Label>
        <Textarea
          id="pref-about"
          value={prefs.aboutYou}
          onChange={(e) => {
            onChange({ aboutYou: e.target.value });
          }}
          className="min-h-20 rounded-xl text-sm"
          placeholder="Interests, preferences, anything useful"
        />
      </div>
    </section>
  );
}
