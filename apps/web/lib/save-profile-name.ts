import { toast } from 'sonner';

import { authClient } from '@/lib/auth-client';

type SaveProfileArgs = {
  nextName: string;
  currentName?: string;
  onDone: () => void;
  onSettled: () => void;
  refresh: () => void;
};

export function saveProfileName({
  nextName,
  currentName,
  onDone,
  onSettled,
  refresh,
}: SaveProfileArgs): void {
  const trimmed = nextName.trim();
  if (!trimmed) {
    toast.error('Name is required');
    onSettled();
    return;
  }
  if (trimmed === (currentName?.trim() ?? '')) {
    onDone();
    onSettled();
    return;
  }

  void authClient
    .updateUser({ name: trimmed })
    .then(({ error }) => {
      if (error) {
        toast.error(error.message || 'Could not update profile');
        return;
      }
      toast.success('Profile updated');
      onDone();
      refresh();
    })
    .finally(onSettled);
}
