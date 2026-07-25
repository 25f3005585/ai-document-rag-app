'use client';

import { Label } from '@repo/ui/components/label';
import { Switch } from '@repo/ui/components/switch';
import { Textarea } from '@repo/ui/components/textarea';

import type { PersonalizationPrefs } from '@/lib/personalization';

type InstructionsProps = {
  prefs: PersonalizationPrefs;
  onChange: (patch: Partial<PersonalizationPrefs>) => void;
};

export function PersonalizationInstructions({ prefs, onChange }: InstructionsProps) {
  return (
    <>
      <div className="border-border flex items-start justify-between gap-4 border-t pt-5">
        <div className="min-w-0 flex-1">
          <Label htmlFor="fast-answers" className="text-sm font-medium tracking-tight">
            Fast answers
          </Label>
          <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
            Prefer quicker replies from general knowledge when personalization isn&apos;t needed.
          </p>
        </div>
        <Switch
          id="fast-answers"
          checked={prefs.fastAnswers}
          onCheckedChange={(checked) => {
            onChange({ fastAnswers: checked });
          }}
        />
      </div>

      <div className="border-border flex flex-col gap-2 border-t pt-5">
        <Label htmlFor="custom-instructions" className="text-sm font-medium tracking-tight">
          Custom instructions
        </Label>
        <Textarea
          id="custom-instructions"
          value={prefs.customInstructions}
          onChange={(e) => {
            onChange({ customInstructions: e.target.value });
          }}
          placeholder="Tell AskDocs how to help you — tone, format, and what to prioritize."
          className="min-h-28 rounded-xl text-sm"
        />
      </div>
    </>
  );
}
