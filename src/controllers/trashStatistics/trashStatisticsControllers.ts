import { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';

import {
  createTrashStatistics,
  deleteTrashStatistics,
  getTrashStatisticsById,
  getTrashStatistics,
  updateTrashStatistics,
} from '@/services/trashStatisticsService';
import {
  validateCreateTrashStatistics,
  validateUpdateTrashStatistics,
  parseTrashStatisticsId,
} from '@/utils/trashStatistics/trashStatisticsUtil';

/**
 * Get all active trash statistics (non-deleted trash statistics)
 * @param c - Hono Context
 * @returns JSON response with array of trash statistics
 */
export async function getTrashStatisticsController(c: Context) {
  const trashStatisticsList = await getTrashStatistics();
  return c.json(trashStatisticsList);
}

/**
 * Get a specific trash statistics by their ID
 * @param c - Hono Context containing the trash statistics ID parameter
 * @returns JSON response with trash statistics data if found
 * @throws NotFoundError if trash statistics doesn't exist or is deleted
 */
export async function getTrashStatisticsByIdController(c: Context) {
  const id = parseTrashStatisticsId(c.req.param('id'));
  const trashStatisticsData = await getTrashStatisticsById(id);
  return c.json(trashStatisticsData);
}

/**
 * Create a new trash statistics
 * @param c - Hono Context containing the trash statistics data in request body
 * @returns JSON response with created trash statistics data and 201 status
 * @throws ValidationError if request body is invalid
 */
export async function createTrashStatisticsController(c: Context) {
  const body = await c.req.json();
  const validatedData = validateCreateTrashStatistics(body);
  const createdTrashStatistics = await createTrashStatistics(validatedData);
  return c.json(createdTrashStatistics, StatusCodes.CREATED);
}

/**
 * Update an existing trash statistics' information
 * @param c - Hono Context containing trash statistics ID and update data
 * @returns JSON response with updated trash statistics data
 * @throws NotFoundError if trash statistics doesn't exist or is deleted
 * @throws ValidationError if update data is invalid
 */
export async function updateTrashStatisticsController(c: Context) {
  const id = parseTrashStatisticsId(c.req.param('id'));
  const body = await c.req.json();
  const validatedData = validateUpdateTrashStatistics(body);
  const updatedTrashStatistics = await updateTrashStatistics(id, validatedData);
  return c.json(updatedTrashStatistics);
}

/**
 * Soft delete a trash statistics (marks as deleted but keeps in database)
 * @param c - Hono Context containing the trash statistics ID to delete
 * @returns JSON response with deleted trash statistics data
 * @throws NotFoundError if trash statistics doesn't exist or is already deleted
 */
export async function deleteTrashStatisticsController(c: Context) {
  const id = parseTrashStatisticsId(c.req.param('id'));
  const deletedTrashStatistics = await deleteTrashStatistics(id);
  return c.json(deletedTrashStatistics);
}
