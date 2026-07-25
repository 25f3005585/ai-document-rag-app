import { redirect } from 'next/navigation';

import { DEFAULT_REDIRECT_PATH } from '@/lib/constants';

export default function Page() {
  redirect(DEFAULT_REDIRECT_PATH);
}
