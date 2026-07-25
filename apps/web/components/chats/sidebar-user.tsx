'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { AccountMenu } from '@/components/chats/account-menu';
import { AccountTrigger } from '@/components/chats/account-trigger';
import { PersonalizationDialog } from '@/components/chats/personalization-dialog';
import { ProfileDialog } from '@/components/chats/profile-dialog';
import { useSessionUser } from '@/components/session-user-provider';
import { signOut } from '@/lib/auth-client';
import { DEFAULT_AUTH_REDIRECT_PATH } from '@/lib/constants';

type SidebarUserProps = {
  compact?: boolean;
};

export function SidebarUser({ compact = false }: SidebarUserProps) {
  const user = useSessionUser();
  const [profileOpen, setProfileOpen] = useState(false);
  const [personalizationOpen, setPersonalizationOpen] = useState(false);
  const displayName = user?.name.trim() || 'Account';
  const displayEmail = user?.email.trim() || 'Signed in';

  const handleSignOut = () => {
    void signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.assign(DEFAULT_AUTH_REDIRECT_PATH);
        },
        onError: () => {
          toast.error('Could not sign out. Please try again.');
        },
      },
    });
  };

  return (
    <>
      <div className={compact ? 'pb-1' : 'border-sidebar-border mt-auto border-t px-3 py-3'}>
        <AccountMenu
          align={compact ? 'center' : 'start'}
          side="top"
          onProfile={() => {
            setProfileOpen(true);
          }}
          onPersonalization={() => {
            setPersonalizationOpen(true);
          }}
          onSignOut={handleSignOut}
        >
          <AccountTrigger
            compact={compact}
            image={user?.image}
            name={user?.name}
            email={user?.email}
            displayName={displayName}
            displayEmail={displayEmail}
          />
        </AccountMenu>
      </div>
      <ProfileDialog open={profileOpen} onOpenChange={setProfileOpen} user={user} />
      <PersonalizationDialog open={personalizationOpen} onOpenChange={setPersonalizationOpen} />
    </>
  );
}
