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
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { PersonalizationAboutSection } from '@/components/chats/personalization-about-section';
import { PersonalizationStyleSection } from '@/components/chats/personalization-style-section';
import {
  DEFAULT_PERSONALIZATION,
  loadPersonalization,
  type PersonalizationPrefs,
  savePersonalization,
} from '@/lib/personalization';

type PersonalizationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PersonalizationDialog({ open, onOpenChange }: PersonalizationDialogProps) {
  const [prefs, setPrefs] = useState<PersonalizationPrefs>(DEFAULT_PERSONALIZATION);

  useEffect(() => {
    if (open) {
      setPrefs(loadPersonalization());
    }
  }, [open]);

  const patchPrefs = (patch: Partial<PersonalizationPrefs>) => {
    setPrefs((current) => ({ ...current, ...patch }));
  };

  const handleSave = () => {
    savePersonalization(prefs);
    toast.success('Personalization saved');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex max-h-[min(88vh,40rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg"
        showCloseButton
      >
        <DialogHeader className="border-border shrink-0 gap-1 border-b px-5 py-4 text-left">
          <DialogTitle className="text-base font-semibold tracking-tight">
            Personalization
          </DialogTitle>
          <DialogDescription>Shape how AskDocs replies — style and context.</DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          <PersonalizationStyleSection prefs={prefs} onChange={patchPrefs} />
          <PersonalizationAboutSection prefs={prefs} onChange={patchPrefs} />
        </div>

        <DialogFooter className="bg-muted/40 border-border m-0 shrink-0 rounded-none border-t px-5 py-3 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button type="button" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
