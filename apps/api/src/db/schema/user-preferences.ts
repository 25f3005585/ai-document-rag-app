import { jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core';

import { user } from './auth.js';

/** Assistant personalization prefs — kept off Better Auth session/cookie cache. */
export type StoredPersonalizationPrefs = {
  style: 'default' | 'professional' | 'friendly' | 'concise';
  warm: 'default' | 'more' | 'less';
  enthusiastic: 'default' | 'more' | 'less';
  headersLists: 'default' | 'more' | 'less';
  emoji: 'default' | 'more' | 'less';
  fastAnswers: boolean;
  customInstructions: string;
  nickname: string;
  occupation: string;
  aboutYou: string;
};

export const userPreferences = pgTable('user_preferences', {
  userId: text('user_id')
    .primaryKey()
    .references(() => user.id, { onDelete: 'cascade' }),
  prefs: jsonb('prefs').$type<StoredPersonalizationPrefs>().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
