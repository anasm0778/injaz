/**
 * Collection Guard Utility
 * Helper function to check if database collections are initialized
 */

import { Response } from 'express';
import { collections } from '../services/database.service';

export function checkCollection(res: Response, ...collectionNames: string[]): boolean {
  for (const name of collectionNames) {
    if (!collections?.[name]) {
      res.status(500).send({
        status: 500,
        message: 'Database not initialized',
        collection: name
      });
      return false;
    }
  }
  return true;
}

export function handleError(res: Response, error: unknown, message: string = 'Internal Server Error') {
  console.error(error);
  res.status(500).send({
    status: 500,
    message,
    error: (error as Error).message
  });
}

