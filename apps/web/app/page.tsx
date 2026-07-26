import type { Metadata } from 'next';

import { LandingPage } from '@/components/landing/landing-page';

export const metadata: Metadata = {
  title: 'AskDocs',
  description:
    'Upload PDFs, Word docs, and more — then ask questions in chat and get answers grounded in your files.',
};

export default function Page() {
  return <LandingPage />;
}
