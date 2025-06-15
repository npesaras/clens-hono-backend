import { type Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';

import { makeError } from '@/utils/error';

/**
 * Enhanced error handler middleware for Hono
 * Handles various error types and provides consistent error responses
 */
export async function errorHandlerMiddleware(err: Error, c: Context) {
  // Handle Hono's HTTPException first
  if (err instanceof HTTPException) {
    return c.json(
      {
        name: 'HTTPException',
        message: err.message,
        status: err.status,
        timestamp: new Date().toISOString(),
        path: c.req.path,
        method: c.req.method,
      },
      err.status
    );
  }

  // Handle our custom errors using the existing makeError function
  const { error, statusCode } = makeError(err);

  // Map statusCode to proper Hono status type
  const mapStatusCode = (code: number) => {
    switch (code) {
      case StatusCodes.BAD_REQUEST:
        return 400;
      case StatusCodes.UNAUTHORIZED:
        return 401;
      case StatusCodes.FORBIDDEN:
        return 403;
      case StatusCodes.NOT_FOUND:
        return 404;
      case StatusCodes.CONFLICT:
        return 409;
      case StatusCodes.INTERNAL_SERVER_ERROR:
      default:
        return 500;
    }
  };

  const honoStatusCode = mapStatusCode(statusCode);

  return c.json(
    {
      ...error,
      timestamp: new Date().toISOString(),
      path: c.req.path,
      method: c.req.method,
    },
    honoStatusCode
  );
}

/**
 * Global error handler for uncaught errors
 */
export const globalErrorHandler = (err: Error, c: Context) => {
  return c.json(
    {
      name: 'InternalServerError',
      message: 'An unexpected error occurred',
      timestamp: new Date().toISOString(),
      path: c.req.path,
      method: c.req.method,
    },
    500
  );
};
