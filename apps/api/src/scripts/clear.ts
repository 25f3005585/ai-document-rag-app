/**
 * Wipe all application rows (keeps schema). Dev/reset helper.
 *
 * Usage:
 *   pnpm db:clear
 *   pnpm db:clear -- --force   # required when NODE_ENV=production
 */
import { getTableName, sql } from 'drizzle-orm';

import { NODE_ENV } from '../config/env.js';
import { db, disconnectDb } from '../db/index.js';
import { account, session, user, verification } from '../db/schema/index.js';
import { logger } from '../utils/logger.js';

const TABLES = [session, account, verification, user] as const;

const clearDatabase = async (): Promise<void> => {
  const force = process.argv.includes('--force');

  if (NODE_ENV === 'production' && !force) {
    throw new Error('Refusing to clear the database in production. Pass --force to override.');
  }

  const tableNames = TABLES.map((table) => `"${getTableName(table)}"`).join(', ');

  await db.execute(sql.raw(`TRUNCATE TABLE ${tableNames} RESTART IDENTITY CASCADE`));

  logger.info({ tables: TABLES.map((table) => getTableName(table)) }, 'Database cleared');
};

clearDatabase()
  .catch((error: unknown) => {
    logger.fatal({ err: error }, 'Failed to clear database');
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDb();
  });
