const STORAGE_KEY = 'askdocs:personalization:v1';

export const STYLE_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'concise', label: 'Concise' },
] as const;

export const TRAIT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'more', label: 'More' },
  { value: 'less', label: 'Less' },
] as const;

export type StyleOption = (typeof STYLE_OPTIONS)[number]['value'];
export type TraitOption = (typeof TRAIT_OPTIONS)[number]['value'];

export type PersonalizationPrefs = {
  style: StyleOption;
  warm: TraitOption;
  enthusiastic: TraitOption;
  headersLists: TraitOption;
  emoji: TraitOption;
  fastAnswers: boolean;
  customInstructions: string;
  nickname: string;
  occupation: string;
  aboutYou: string;
};

export const DEFAULT_PERSONALIZATION: PersonalizationPrefs = {
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

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object';
}

function asStyle(value: unknown): StyleOption {
  return STYLE_OPTIONS.some((o) => o.value === value)
    ? (value as StyleOption)
    : DEFAULT_PERSONALIZATION.style;
}

function asTrait(value: unknown): TraitOption {
  return TRAIT_OPTIONS.some((o) => o.value === value) ? (value as TraitOption) : 'default';
}

export function loadPersonalization(): PersonalizationPrefs {
  if (typeof window === 'undefined') {
    return DEFAULT_PERSONALIZATION;
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_PERSONALIZATION;
    }
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) {
      return DEFAULT_PERSONALIZATION;
    }
    return {
      style: asStyle(parsed.style),
      warm: asTrait(parsed.warm),
      enthusiastic: asTrait(parsed.enthusiastic),
      headersLists: asTrait(parsed.headersLists),
      emoji: asTrait(parsed.emoji),
      fastAnswers: typeof parsed.fastAnswers === 'boolean' ? parsed.fastAnswers : true,
      customInstructions:
        typeof parsed.customInstructions === 'string' ? parsed.customInstructions : '',
      nickname: typeof parsed.nickname === 'string' ? parsed.nickname : '',
      occupation: typeof parsed.occupation === 'string' ? parsed.occupation : '',
      aboutYou: typeof parsed.aboutYou === 'string' ? parsed.aboutYou : '',
    };
  } catch {
    return DEFAULT_PERSONALIZATION;
  }
}

export function savePersonalization(prefs: PersonalizationPrefs): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Ignore quota / private mode failures.
  }
}
