'use client';

import { Button } from '@repo/ui/components/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { signOut } from '@/lib/auth-client';

interface HomeAuthPanelProps {
  name: string;
  email: string;
}

export function HomeAuthPanel({ name, email }: HomeAuthPanelProps) {
  const router = useRouter();

  const handleSignOut = () => {
    void signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success('Signed out');
          router.push('/login');
          router.refresh();
        },
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <p className="text-lg font-medium">Welcome, {name}</p>
        {email ? <p className="text-muted-foreground text-sm">{email}</p> : null}
      </div>
      <Button variant="outline" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
}
