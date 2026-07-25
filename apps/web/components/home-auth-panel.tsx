'use client';

import { Button } from '@repo/ui/components/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { authClient, signOut } from '@/lib/auth-client';

export function HomeAuthPanel() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

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

  if (isPending) {
    return <p className="text-muted-foreground text-sm">Loading session...</p>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <p className="text-lg font-medium">Welcome, {session?.user.name ?? 'there'}</p>
        <p className="text-muted-foreground text-sm">{session?.user.email}</p>
      </div>
      <Button variant="outline" onClick={handleSignOut}>
        Sign out
      </Button>
    </div>
  );
}
