import type { CSSProperties } from 'react';

export const APP_NAME = 'AskDocs';

/** Ink-forward palette — readable in Gmail, Apple Mail, Outlook. */
export const colors = {
  canvas: '#f4f4f5',
  card: '#ffffff',
  ink: '#18181b',
  muted: '#71717a',
  subtle: '#a1a1aa',
  border: '#e4e4e7',
  markBg: '#18181b',
  markFg: '#ffffff',
  buttonBg: '#18181b',
  buttonFg: '#ffffff',
} as const;

export const fontFamily =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

export const main: CSSProperties = {
  backgroundColor: colors.canvas,
  fontFamily,
  margin: 0,
  padding: '40px 16px',
};

export const container: CSSProperties = {
  backgroundColor: colors.card,
  border: `1px solid ${colors.border}`,
  borderRadius: '12px',
  margin: '0 auto',
  maxWidth: '520px',
  overflow: 'hidden',
};

export const header: CSSProperties = {
  borderBottom: `1px solid ${colors.border}`,
  padding: '28px 32px 24px',
};

export const mark: CSSProperties = {
  backgroundColor: colors.markBg,
  borderRadius: '8px',
  color: colors.markFg,
  display: 'inline-block',
  fontSize: '13px',
  fontWeight: 700,
  height: '28px',
  letterSpacing: '-0.02em',
  lineHeight: '28px',
  textAlign: 'center',
  width: '28px',
};

export const brandName: CSSProperties = {
  color: colors.ink,
  fontSize: '15px',
  fontWeight: 600,
  letterSpacing: '-0.02em',
  margin: '0 0 0 10px',
};

export const body: CSSProperties = {
  padding: '32px',
};

export const heading: CSSProperties = {
  color: colors.ink,
  fontSize: '22px',
  fontWeight: 600,
  letterSpacing: '-0.03em',
  lineHeight: '1.3',
  margin: '0 0 12px',
};

export const paragraph: CSSProperties = {
  color: colors.muted,
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0 0 16px',
};

export const button: CSSProperties = {
  backgroundColor: colors.buttonBg,
  borderRadius: '8px',
  color: colors.buttonFg,
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: 600,
  letterSpacing: '-0.01em',
  lineHeight: '1',
  padding: '14px 22px',
  textAlign: 'center',
  textDecoration: 'none',
};

export const buttonWrap: CSSProperties = {
  margin: '28px 0 8px',
  textAlign: 'center',
};

export const fallbackLabel: CSSProperties = {
  color: colors.subtle,
  fontSize: '12px',
  lineHeight: '1.5',
  margin: '24px 0 0',
};

export const fallbackLink: CSSProperties = {
  color: colors.muted,
  fontSize: '12px',
  lineHeight: '1.5',
  overflowWrap: 'anywhere',
  wordBreak: 'break-all',
};

export const footer: CSSProperties = {
  borderTop: `1px solid ${colors.border}`,
  padding: '20px 32px 28px',
};

export const footerText: CSSProperties = {
  color: colors.subtle,
  fontSize: '12px',
  lineHeight: '1.5',
  margin: 0,
};
