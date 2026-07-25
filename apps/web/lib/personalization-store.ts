'use client';

import { create } from 'zustand';

import { ApiError } from '@/lib/api';
import {
  DEFAULT_PERSONALIZATION,
  fetchPersonalization,
  type PersonalizationPrefs,
  readCachedPersonalization,
  savePersonalizationRemote,
} from '@/lib/personalization';

type LoadStatus = 'idle' | 'loading' | 'ready' | 'error';

type PersonalizationStore = {
  prefs: PersonalizationPrefs;
  status: LoadStatus;
  error: string | null;
  ensureLoaded: () => Promise<void>;
  savePrefs: (prefs: PersonalizationPrefs) => Promise<void>;
};

export const usePersonalizationStore = create<PersonalizationStore>((set, get) => ({
  prefs: typeof window === 'undefined' ? DEFAULT_PERSONALIZATION : readCachedPersonalization(),
  status: 'idle',
  error: null,

  ensureLoaded: async () => {
    const { status } = get();
    if (status === 'ready' || status === 'loading') {
      return;
    }

    set({ status: 'loading', error: null });
    try {
      const prefs = await fetchPersonalization();
      set({ prefs, status: 'ready', error: null });
    } catch (error: unknown) {
      const message = error instanceof ApiError ? error.message : 'Could not load preferences';
      set({ status: 'error', error: message });
      throw error;
    }
  },

  savePrefs: async (prefs) => {
    const saved = await savePersonalizationRemote(prefs);
    set({ prefs: saved, status: 'ready', error: null });
  },
}));
