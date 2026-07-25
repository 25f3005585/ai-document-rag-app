'use client';

import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';

import { UserAvatar } from '@/components/chats/user-avatar';
import type { SessionUser } from '@/lib/session-user';

type ProfileDialogFieldsProps = {
  user: SessionUser | null;
  name: string;
  email: string;
  onNameChange: (value: string) => void;
};

export function ProfileDialogFields({ user, name, email, onNameChange }: ProfileDialogFieldsProps) {
  return (
    <div className="flex flex-col gap-5 px-5 py-5">
      <div className="flex items-center gap-3">
        <UserAvatar image={user?.image} name={name || user?.name} email={user?.email} size="lg" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight">
            {name.trim() || user?.name || 'Account'}
          </p>
          <p className="text-muted-foreground truncate text-xs">{email}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="profile-name" className="text-muted-foreground text-xs font-medium">
            Name
          </Label>
          <Input
            id="profile-name"
            value={name}
            onChange={(e) => {
              onNameChange(e.target.value);
            }}
            autoComplete="name"
            className="rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="profile-email" className="text-muted-foreground text-xs font-medium">
            Email
          </Label>
          <Input
            id="profile-email"
            value={email}
            readOnly
            disabled
            className="rounded-xl opacity-80"
          />
        </div>
      </div>
    </div>
  );
}
