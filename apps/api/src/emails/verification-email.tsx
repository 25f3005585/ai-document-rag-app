import { Button, Link, Text } from 'react-email';

import { EmailLayout } from './email-layout.js';
import { APP_NAME, button, buttonWrap, fallbackLabel, fallbackLink, paragraph } from './styles.js';

interface VerificationEmailProps {
  url: string;
  siteUrl: string;
}

export const VerificationEmail = ({ url, siteUrl }: VerificationEmailProps) => (
  <EmailLayout
    preview={`Confirm your email to get started with ${APP_NAME}.`}
    title="Verify your email"
    siteUrl={siteUrl}
  >
    <Text style={paragraph}>
      Welcome to {APP_NAME}. Confirm your email address so we know it is really you — then you can
      start asking questions grounded in your documents.
    </Text>
    <Text style={paragraph}>
      This link expires soon. Use it once to finish setting up your account.
    </Text>

    <div style={buttonWrap}>
      <Button href={url} style={button}>
        Verify email address
      </Button>
    </div>

    <Text style={fallbackLabel}>Or copy and paste this link into your browser:</Text>
    <Link href={url} style={fallbackLink}>
      {url}
    </Link>
  </EmailLayout>
);

VerificationEmail.PreviewProps = {
  url: 'https://askdocs.app/api/auth/verify-email?token=example',
  siteUrl: 'https://askdocs.app',
} satisfies VerificationEmailProps;

export default VerificationEmail;
