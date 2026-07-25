export type SessionUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

export function toSessionUser(user: {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}): SessionUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
  };
}
