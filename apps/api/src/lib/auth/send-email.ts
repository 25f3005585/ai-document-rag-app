import type { ReactElement } from 'react';
import { jsx } from 'react/jsx-runtime';
import { Resend } from 'resend';

import { EMAIL_FROM, RESEND_API_KEY, WEB_URL } from '../../config/env.js';
import { ResetPasswordEmail } from '../../emails/reset-password-email.js';
import { APP_NAME } from '../../emails/styles.js';
import { VerificationEmail } from '../../emails/verification-email.js';
import { logger } from '../../utils/logger.js';

const resend = new Resend(RESEND_API_KEY);

interface SendEmailInput {
  to: string;
  subject: string;
  react: ReactElement;
}

export const sendEmail = (input: SendEmailInput): void => {
  void resend.emails
    .send({
      from: EMAIL_FROM,
      to: input.to,
      subject: input.subject,
      react: input.react,
    })
    .then(({ error }) => {
      if (error) {
        logger.error({ err: error, to: input.to }, 'Failed to send email via Resend');
      }
    })
    .catch((error: unknown) => {
      logger.error({ err: error, to: input.to }, 'Resend email request failed');
    });
};

export const sendVerificationEmailMessage = (to: string, url: string): void => {
  sendEmail({
    to,
    subject: `Verify your ${APP_NAME} email`,
    react: jsx(VerificationEmail, { url, siteUrl: WEB_URL }),
  });
};

export const sendResetPasswordEmailMessage = (to: string, url: string): void => {
  sendEmail({
    to,
    subject: `Reset your ${APP_NAME} password`,
    react: jsx(ResetPasswordEmail, { url, siteUrl: WEB_URL }),
  });
};
