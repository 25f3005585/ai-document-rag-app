import { Button, Link, Text } from 'react-email';

import { EmailLayout } from './email-layout.js';
import { APP_NAME, button, buttonWrap, fallbackLabel, fallbackLink, paragraph } from './styles.js';

interface ResetPasswordEmailProps {
  url: string;
  siteUrl: string;
}

export const ResetPasswordEmail = ({ url, siteUrl }: ResetPasswordEmailProps) => (
  <EmailLayout
    preview={`Reset your ${APP_NAME} password.`}
    title="Reset your password"
    siteUrl={siteUrl}
    footerNote={`If you didn't ask to reset your password, you can safely ignore this email. Your ${APP_NAME} account stays secure.`}
  >
    <Text style={paragraph}>
      We received a request to reset the password for your {APP_NAME} account. Click the button
      below to choose a new one.
    </Text>
    <Text style={paragraph}>For your security, this link works only once and expires shortly.</Text>

    <div style={buttonWrap}>
      <Button href={url} style={button}>
        Reset password
      </Button>
    </div>

    <Text style={fallbackLabel}>Or copy and paste this link into your browser:</Text>
    <Link href={url} style={fallbackLink}>
      {url}
    </Link>
  </EmailLayout>
);

ResetPasswordEmail.PreviewProps = {
  url: 'https://askdocs.app/reset-password?token=example',
  siteUrl: 'https://askdocs.app',
} satisfies ResetPasswordEmailProps;

export default ResetPasswordEmail;
