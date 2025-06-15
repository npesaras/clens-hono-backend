import { type Context } from 'hono';

import { makeError } from '@/utils/error';

export async function errorHandlerMiddleware(err: Error, c: Context) {
  const { error, statusCode } = makeError(err);
  c.status(statusCode as any);
  return c.json(error);
}
