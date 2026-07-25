import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'yaml';

import { logger } from '../utils/logger.js';
import { NODE_ENV } from './env.js';

const resolveOpenApiPath = (): string => {
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.resolve(moduleDir, '../docs/openapi.yaml'),
    path.resolve(process.cwd(), 'src/docs/openapi.yaml'),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error('OpenAPI spec not found');
};

const mountSwaggerUi = async (router: express.Router): Promise<void> => {
  const openApiPath = resolveOpenApiPath();
  const fileContents = fs.readFileSync(openApiPath, 'utf8');
  const openApiDocument = yaml.parse(fileContents) as Record<string, unknown>;
  const swaggerUi = (await import('swagger-ui-express')).default;

  router.use(swaggerUi.serve, swaggerUi.setup(openApiDocument));
};

/** Registers `/api-docs` immediately; loads swagger-ui in the background. */
const setupSwagger = (app: express.Application): void => {
  if (NODE_ENV === 'production') {
    return;
  }

  const router = express.Router();
  app.use('/api-docs', router);

  void mountSwaggerUi(router).catch((error: unknown) => {
    logger.error({ err: error }, 'Failed to load OpenAPI spec');
  });
};

export default setupSwagger;
