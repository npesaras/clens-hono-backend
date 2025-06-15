import { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';

import {
  createWaterQualityStatistics,
  deleteWaterQualityStatistics,
  getWaterQualityStatisticsById,
  getWaterQualityStatistics,
  updateWaterQualityStatistics,
} from '@/services/waterQualityStatisticsService';
import {
  validateCreateWaterQualityStatistics,
  validateUpdateWaterQualityStatistics,
  parseWaterQualityStatisticsKey,
} from '@/utils/waterQualityStatistics/waterQualityStatisticsUtil';

/**
 * Get all water quality statistics
 * @param c - Hono Context
 * @returns JSON response with array of water quality statistics
 */
export async function getWaterQualityStatisticsController(c: Context) {
  const waterQualityStatisticsList = await getWaterQualityStatistics();
  return c.json(waterQualityStatisticsList);
}

/**
 * Get a specific water quality statistics by interval and start date
 * @param c - Hono Context containing the interval and start date parameters
 * @returns JSON response with water quality statistics data if found
 * @throws NotFoundError if water quality statistics doesn't exist
 */
export async function getWaterQualityStatisticsByKeyController(c: Context) {
  const { interval, startDate } = parseWaterQualityStatisticsKey(
    c.req.param('interval'),
    c.req.param('startDate')
  );
  const waterQualityStatisticsData = await getWaterQualityStatisticsById(
    interval,
    startDate
  );
  return c.json(waterQualityStatisticsData);
}

/**
 * Create a new water quality statistics
 * @param c - Hono Context containing the water quality statistics data in request body
 * @returns JSON response with created water quality statistics data and 201 status
 * @throws ValidationError if request body is invalid
 */
export async function createWaterQualityStatisticsController(c: Context) {
  const body = await c.req.json();
  const validatedData = validateCreateWaterQualityStatistics(body);
  const createdWaterQualityStatistics =
    await createWaterQualityStatistics(validatedData);
  return c.json(createdWaterQualityStatistics, StatusCodes.CREATED);
}

/**
 * Update an existing water quality statistics' information
 * @param c - Hono Context containing interval, start date and update data
 * @returns JSON response with updated water quality statistics data
 * @throws NotFoundError if water quality statistics doesn't exist
 * @throws ValidationError if update data is invalid
 */
export async function updateWaterQualityStatisticsController(c: Context) {
  const { interval, startDate } = parseWaterQualityStatisticsKey(
    c.req.param('interval'),
    c.req.param('startDate')
  );
  const body = await c.req.json();
  const validatedData = validateUpdateWaterQualityStatistics(body);
  const updatedWaterQualityStatistics = await updateWaterQualityStatistics(
    interval,
    startDate,
    validatedData
  );
  return c.json(updatedWaterQualityStatistics);
}

/**
 * Delete a water quality statistics
 * @param c - Hono Context containing the interval and start date to delete
 * @returns JSON response with deleted water quality statistics data
 * @throws NotFoundError if water quality statistics doesn't exist
 */
export async function deleteWaterQualityStatisticsController(c: Context) {
  const { interval, startDate } = parseWaterQualityStatisticsKey(
    c.req.param('interval'),
    c.req.param('startDate')
  );
  const deletedWaterQualityStatistics = await deleteWaterQualityStatistics(
    interval,
    startDate
  );
  return c.json(deletedWaterQualityStatistics);
}
