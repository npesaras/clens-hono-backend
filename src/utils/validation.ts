import { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodSchema } from 'zod';

import { assertParam, throwBadRequest } from '@/middlewares/error-handler';

/**
 * Validates request body using a Zod schema
 * @param c - Hono Context
 * @param schema - Zod validation schema
 * @returns Validated data
 * @throws BadRequestError if validation fails
 */
export async function validateRequestBody<T>(
  c: Context,
  schema: ZodSchema<T>
): Promise<T> {
  try {
    const body = await c.req.json();
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      throwBadRequest(`Validation failed: ${error.message}`);
    }
    throwBadRequest('Invalid JSON in request body');
  }
}

/**
 * Validates request parameters using a Zod schema
 * @param c - Hono Context
 * @param schema - Zod validation schema
 * @returns Validated parameters
 * @throws BadRequestError if validation fails
 */
export function validateRequestParams<T>(c: Context, schema: ZodSchema<T>): T {
  try {
    const params = c.req.param();
    return schema.parse(params);
  } catch (error) {
    if (error instanceof ZodError) {
      throwBadRequest(`Parameter validation failed: ${error.message}`);
    }
    throwBadRequest('Invalid request parameters');
  }
}

/**
 * Validates query parameters using a Zod schema
 * @param c - Hono Context
 * @param schema - Zod validation schema
 * @returns Validated query parameters
 * @throws BadRequestError if validation fails
 */
export function validateQueryParams<T>(c: Context, schema: ZodSchema<T>): T {
  try {
    const query = c.req.query();
    return schema.parse(query);
  } catch (error) {
    if (error instanceof ZodError) {
      throwBadRequest(`Query validation failed: ${error.message}`);
    }
    throwBadRequest('Invalid query parameters');
  }
}

/**
 * Creates a standardized success response
 * @param c - Hono Context
 * @param data - Response data
 * @param statusCode - HTTP status code (default: 200)
 * @param message - Optional success message
 * @returns JSON response
 */
export function createSuccessResponse<T>(
  c: Context,
  data: T,
  statusCode: 200 | 201 = StatusCodes.OK,
  message?: string
) {
  interface SuccessResponse<TData> {
    success: true;
    data: TData;
    timestamp: string;
    message?: string;
  }

  const response: SuccessResponse<T> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };

  if (message) {
    response.message = message;
  }

  return c.json(response, statusCode);
}

/**
 * Creates a paginated response
 * @param c - Hono Context
 * @param data - Array of data items
 * @param total - Total number of items
 * @param page - Current page number
 * @param limit - Items per page
 * @returns JSON response with pagination metadata
 */
export function createPaginatedResponse<T>(
  c: Context,
  data: T[],
  total: number,
  page: number,
  limit: number
) {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  return c.json({
    success: true,
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext,
      hasPrev,
    },
    timestamp: new Date().toISOString(),
  });
}

/**
 * Safely parses an ID parameter from the request
 * @param c - Hono Context
 * @param paramName - The parameter name (default: 'id')
 * @returns Parsed numeric ID
 * @throws BadRequestError if ID is invalid
 */
export function parseIdParam(c: Context, paramName = 'id'): number {
  const idStr = c.req.param(paramName);
  assertParam(idStr, paramName);

  const id = Number(idStr);
  if (isNaN(id) || id <= 0) {
    throwBadRequest(`Invalid ${paramName}: must be a positive number`);
  }

  return id;
}

/**
 * Safely gets and validates request body JSON
 * @param c - Hono Context
 * @returns Parsed JSON object
 * @throws BadRequestError if JSON is invalid
 */
export async function getValidatedBody(c: Context): Promise<unknown> {
  try {
    return await c.req.json();
  } catch {
    throwBadRequest('Invalid JSON in request body');
  }
}
