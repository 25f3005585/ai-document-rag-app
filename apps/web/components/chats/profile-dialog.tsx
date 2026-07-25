'use client';

import { Button } from '@repo/ui/components/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@repo/ui/components/dialog';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ProfileDialogFields } from '@/components/chats/profile-dialog-fields';
import { saveProfileName } from '@/lib/save-profile-name';
import type { SessionUser } from '@/lib/session-user';

type ProfileDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: SessionUser | null;
};

export function ProfileDialog({ open, onOpenChange, user }: ProfileDialogProps) {
  const router = useRouter();
  const [name, setName] = useState(user?.name ?? '');
  const [saving, setSaving] = useState(false);
  const email = user?.email.trim() || '—';

  useEffect(() => {
    if (open) {
      setName(user?.name ?? '');
    }
  }, [open, user?.name]);

  const handleSave = () => {
    setSaving(true);
    saveProfileName({
      nextName: name,
      currentName: user?.name,
      onDone: () => {
        onOpenChange(false);
      },
      onSettled: () => {
        setSaving(false);
      },
      refresh: () => {
        router.refresh();
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-md" showCloseButton>
        <DialogHeader className="border-border gap-1 border-b px-5 py-4 text-left">
          <DialogTitle className="text-base font-semibold tracking-tight">Profile</DialogTitle>
          <DialogDescription>View and update your AskDocs account details.</DialogDescription>
        </DialogHeader>
        <ProfileDialogFields user={user} name={name} email={email} onNameChange={setName} />
        <DialogFooter className="bg-muted/40 border-border m-0 rounded-none border-t px-5 py-3 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button type="button" disabled={saving} onClick={handleSave}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
