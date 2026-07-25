import { MongoClient } from 'mongodb';

import { MONGO_URI } from '../../config/env.js';
import { logger } from '../../utils/logger.js';

export const authMongoClient = new MongoClient(MONGO_URI);
export const authDb = authMongoClient.db();

export const connectAuthMongo = async (): Promise<void> => {
  await authMongoClient.connect();
  logger.info({ dbName: authDb.databaseName }, 'Better Auth MongoDB client connected');
};

export const disconnectAuthMongo = async (): Promise<void> => {
  await authMongoClient.close();
  logger.info('Better Auth MongoDB client disconnected');
};
