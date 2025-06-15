import { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { ZodError, ZodSchema } from 'zod';

import { BadRequestError } from '@/utils/error';

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
      throw new BadRequestError(`Validation failed: ${error.message}`);
    }
    throw new BadRequestError('Invalid JSON in request body');
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
      throw new BadRequestError(
        `Parameter validation failed: ${error.message}`
      );
    }
    throw new BadRequestError('Invalid request parameters');
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
      throw new BadRequestError(`Query validation failed: ${error.message}`);
    }
    throw new BadRequestError('Invalid query parameters');
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
