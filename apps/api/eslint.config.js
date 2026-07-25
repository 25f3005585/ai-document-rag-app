import { nodeConfig } from '@repo/eslint-config/node';

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: ['drizzle.config.ts', 'drizzle/**'],
  },
  ...nodeConfig,
];
