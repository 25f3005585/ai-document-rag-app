import { eq } from 'drizzle-orm';

import {
  DEFAULT_PERSONALIZATION_PREFS,
  type PersonalizationPrefsInput,
} from '../core/validation/schemas/personalization.schema.js';
import { db } from '../db/index.js';
import { userPreferences } from '../db/schema/index.js';

export async function getUserPreferences(userId: string): Promise<PersonalizationPrefsInput> {
  const [row] = await db
    .select({ prefs: userPreferences.prefs })
    .from(userPreferences)
    .where(eq(userPreferences.userId, userId))
    .limit(1);

  return row?.prefs ?? DEFAULT_PERSONALIZATION_PREFS;
}

export async function upsertUserPreferences(
  userId: string,
  prefs: PersonalizationPrefsInput,
): Promise<PersonalizationPrefsInput> {
  const [row] = await db
    .insert(userPreferences)
    .values({ userId, prefs })
    .onConflictDoUpdate({
      target: userPreferences.userId,
      set: { prefs, updatedAt: new Date() },
    })
    .returning({ prefs: userPreferences.prefs });

  return row?.prefs ?? prefs;
}
