import { type Context } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';

import { BadRequestError, makeError, NotFoundError } from '@/utils/error';

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

/**
 * Centralized error throwing utilities
 * These functions create standardized errors that are handled by the global error handler
 */

/**
 * Throws a NotFoundError with a standardized message
 * @param resource - The resource type (e.g., 'User', 'Address')
 * @param id - Optional ID of the resource
 */
export function throwNotFound(resource: string, id?: string | number): never {
  const message = id
    ? `${resource} with ID ${id} not found`
    : `${resource} not found`;
  throw new NotFoundError(message);
}

/**
 * Throws a BadRequestError with a standardized message
 * @param message - The error message
 */
export function throwBadRequest(message: string): never {
  throw new BadRequestError(message);
}

/**
 * Throws a NotFoundError if the record is not found
 * @param record - The database record
 * @param resource - The resource type
 * @param id - Optional ID of the resource
 */
export function assertFound<T>(
  record: T | undefined | null,
  resource: string,
  id?: string | number
): asserts record is T {
  if (!record) {
    throwNotFound(resource, id);
  }
}

/**
 * Validates that a required parameter exists
 * @param value - The parameter value
 * @param paramName - The parameter name
 */
export function assertParam(
  value: string | undefined,
  paramName: string
): asserts value is string {
  if (!value) {
    throwBadRequest(`${paramName} is required`);
  }
}
