import { Resend } from 'resend';

import { EMAIL_FROM, RESEND_API_KEY } from '../../config/env.js';
import { logger } from '../../utils/logger.js';

const resend = new Resend(RESEND_API_KEY);

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text: string;
}

export const sendEmail = (input: SendEmailInput): void => {
  void resend.emails
    .send({
      from: EMAIL_FROM,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
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
    subject: 'Verify your AskDocs email',
    text: `Welcome to AskDocs. Click the link to verify your email: ${url}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.5;">
        <h1>Verify your email</h1>
        <p>Welcome to AskDocs. Confirm your email address to continue.</p>
        <p>
          <a href="${url}" style="display:inline-block;padding:10px 16px;background:#111;color:#fff;text-decoration:none;border-radius:6px;">
            Verify email
          </a>
        </p>
        <p style="color:#666;font-size:12px;">Or copy this link: ${url}</p>
      </div>
    `,
  });
};

export const sendResetPasswordEmailMessage = (to: string, url: string): void => {
  sendEmail({
    to,
    subject: 'Reset your AskDocs password',
    text: `Reset your AskDocs password using this link: ${url}`,
    html: `
      <div style="font-family: sans-serif; line-height: 1.5;">
        <h1>Reset your password</h1>
        <p>We received a request to reset your AskDocs password.</p>
        <p>
          <a href="${url}" style="display:inline-block;padding:10px 16px;background:#111;color:#fff;text-decoration:none;border-radius:6px;">
            Reset password
          </a>
        </p>
        <p style="color:#666;font-size:12px;">Or copy this link: ${url}</p>
        <p style="color:#666;font-size:12px;">If you did not request this, you can ignore this email.</p>
      </div>
    `,
  });
};
