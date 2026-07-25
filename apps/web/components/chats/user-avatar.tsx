import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/avatar';
import { cn } from '@repo/ui/lib/utils';

export function initialsFrom(name?: string | null, email?: string | null): string {
  const source = name?.trim() || email?.trim() || 'U';
  const parts = source.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0]?.[0] ?? ''}${parts[1]?.[0] ?? ''}`.toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

type UserAvatarProps = {
  image?: string | null;
  name?: string | null;
  email?: string | null;
  size?: 'sm' | 'default' | 'lg';
  className?: string;
};

export function UserAvatar({ image, name, email, size = 'default', className }: UserAvatarProps) {
  return (
    <Avatar size={size} className={cn(size === 'default' && 'size-8', className)}>
      {image ? <AvatarImage src={image} alt="" /> : null}
      <AvatarFallback className="bg-muted text-muted-foreground text-xs font-medium">
        {initialsFrom(name, email)}
      </AvatarFallback>
    </Avatar>
  );
}
