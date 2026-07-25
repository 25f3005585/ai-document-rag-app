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

import { PersonalizationAboutSection } from '@/components/chats/personalization-about-section';
import { PersonalizationStyleSection } from '@/components/chats/personalization-style-section';
import { usePersonalizationForm } from '@/components/chats/use-personalization-form';

type PersonalizationDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function PersonalizationDialog({ open, onOpenChange }: PersonalizationDialogProps) {
  const { prefs, loading, saving, patchPrefs, save } = usePersonalizationForm(open);

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
          {loading ? (
            <p className="text-muted-foreground text-sm">Loading preferences…</p>
          ) : (
            <>
              <PersonalizationStyleSection prefs={prefs} onChange={patchPrefs} />
              <PersonalizationAboutSection prefs={prefs} onChange={patchPrefs} />
            </>
          )}
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
          <Button
            type="button"
            disabled={loading || saving}
            onClick={() => {
              save(() => {
                onOpenChange(false);
              });
            }}
          >
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
