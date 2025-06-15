import { makeError } from '@/utils/error';
import { type Context } from 'hono';

export async function errorHandlerMiddleware(err: Error, c: Context) {
  const { error, statusCode } = makeError(err);
  c.status(statusCode as any);
  return c.json(error);
}