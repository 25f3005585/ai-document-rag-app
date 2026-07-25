'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { ApiError } from '@/lib/api';
import type { PersonalizationPrefs } from '@/lib/personalization';
import { usePersonalizationStore } from '@/lib/personalization-store';

type UsePersonalizationFormResult = {
  prefs: PersonalizationPrefs;
  loading: boolean;
  saving: boolean;
  patchPrefs: (patch: Partial<PersonalizationPrefs>) => void;
  save: (onSuccess: () => void) => void;
};

export function usePersonalizationForm(open: boolean): UsePersonalizationFormResult {
  const status = usePersonalizationStore((state) => state.status);
  const ensureLoaded = usePersonalizationStore((state) => state.ensureLoaded);
  const savePrefs = usePersonalizationStore((state) => state.savePrefs);

  const [draft, setDraft] = useState(() => usePersonalizationStore.getState().prefs);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) {
      return;
    }

    let cancelled = false;
    setDraft(usePersonalizationStore.getState().prefs);

    void ensureLoaded()
      .then(() => {
        if (!cancelled) {
          setDraft(usePersonalizationStore.getState().prefs);
        }
      })
      .catch((error: unknown) => {
        if (cancelled) {
          return;
        }
        const message = error instanceof ApiError ? error.message : 'Could not load preferences';
        toast.error(message);
      });

    return () => {
      cancelled = true;
    };
  }, [open, ensureLoaded]);

  const patchPrefs = (patch: Partial<PersonalizationPrefs>) => {
    setDraft((current) => ({ ...current, ...patch }));
  };

  const save = (onSuccess: () => void) => {
    setSaving(true);
    void savePrefs(draft)
      .then(() => {
        toast.success('Personalization saved');
        onSuccess();
      })
      .catch((error: unknown) => {
        const message = error instanceof ApiError ? error.message : 'Could not save preferences';
        toast.error(message);
      })
      .finally(() => {
        setSaving(false);
      });
  };

  return {
    prefs: draft,
    loading: open && status === 'loading',
    saving,
    patchPrefs,
    save,
  };
}
