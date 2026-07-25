/** Auth-sensitive Better Auth rate limits (window in seconds). */
export const AUTH_RATE_LIMIT = {
  enabled: true,
  window: 60,
  max: 100,
  customRules: {
    '/sign-in/email': {
      window: 15 * 60,
      max: 10,
    },
    '/request-password-reset': {
      window: 15 * 60,
      max: 5,
    },
    '/forget-password': {
      window: 15 * 60,
      max: 5,
    },
  },
} as const;
