import { apiFetch } from '@/lib/api';

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

export function normalizePersonalization(value: unknown): PersonalizationPrefs {
  if (!isRecord(value)) {
    return DEFAULT_PERSONALIZATION;
  }
  return {
    style: asStyle(value.style),
    warm: asTrait(value.warm),
    enthusiastic: asTrait(value.enthusiastic),
    headersLists: asTrait(value.headersLists),
    emoji: asTrait(value.emoji),
    fastAnswers: typeof value.fastAnswers === 'boolean' ? value.fastAnswers : true,
    customInstructions:
      typeof value.customInstructions === 'string' ? value.customInstructions : '',
    nickname: typeof value.nickname === 'string' ? value.nickname : '',
    occupation: typeof value.occupation === 'string' ? value.occupation : '',
    aboutYou: typeof value.aboutYou === 'string' ? value.aboutYou : '',
  };
}

export function readCachedPersonalization(): PersonalizationPrefs {
  if (typeof window === 'undefined') {
    return DEFAULT_PERSONALIZATION;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? normalizePersonalization(JSON.parse(raw)) : DEFAULT_PERSONALIZATION;
  } catch {
    return DEFAULT_PERSONALIZATION;
  }
}

export function cachePersonalization(prefs: PersonalizationPrefs): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Ignore quota / private mode failures.
  }
}

function isDefaultPrefs(prefs: PersonalizationPrefs): boolean {
  return JSON.stringify(prefs) === JSON.stringify(DEFAULT_PERSONALIZATION);
}

export async function fetchPersonalization(): Promise<PersonalizationPrefs> {
  const data = await apiFetch<{ prefs: PersonalizationPrefs }>('/api/me/preferences');
  const remote = normalizePersonalization(data.prefs);
  const local = readCachedPersonalization();

  if (isDefaultPrefs(remote) && !isDefaultPrefs(local)) {
    const migrated = await savePersonalizationRemote(local);
    return migrated;
  }

  cachePersonalization(remote);
  return remote;
}

export async function savePersonalizationRemote(
  prefs: PersonalizationPrefs,
): Promise<PersonalizationPrefs> {
  const data = await apiFetch<{ prefs: PersonalizationPrefs }>('/api/me/preferences', {
    method: 'PUT',
    body: JSON.stringify(prefs),
  });
  const saved = normalizePersonalization(data.prefs);
  cachePersonalization(saved);
  return saved;
}
