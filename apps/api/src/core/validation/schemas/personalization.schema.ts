import { z } from 'zod';

const styleSchema = z.enum(['default', 'professional', 'friendly', 'concise']);
const traitSchema = z.enum(['default', 'more', 'less']);

export const personalizationPrefsSchema = z.object({
  style: styleSchema,
  warm: traitSchema,
  enthusiastic: traitSchema,
  headersLists: traitSchema,
  emoji: traitSchema,
  fastAnswers: z.boolean(),
  customInstructions: z.string().max(4000),
  nickname: z.string().max(80),
  occupation: z.string().max(120),
  aboutYou: z.string().max(2000),
});

export type PersonalizationPrefsInput = z.infer<typeof personalizationPrefsSchema>;

export const DEFAULT_PERSONALIZATION_PREFS: PersonalizationPrefsInput = {
  style: 'professional',
  warm: 'default',
  enthusiastic: 'default',
  headersLists: 'default',
  emoji: 'default',
  fastAnswers: true,
  customInstructions: '',
  nickname: '',
  occupation: '',
  aboutYou: '',
};
