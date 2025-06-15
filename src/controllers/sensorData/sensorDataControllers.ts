import { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';

import {
  createSensorData,
  deleteSensorData,
  getSensorDataById,
  getSensorData,
  updateSensorData,
} from '@/services/sensorDataService';
import {
  validateCreateSensorData,
  validateUpdateSensorData,
  parseSensorDataId,
} from '@/utils/sensorData/sensorDataUtil';

/**
 * Get all active sensor data (non-deleted sensor data)
 * @param c - Hono Context
 * @returns JSON response with array of sensor data
 */
export async function getSensorDataController(c: Context) {
  const sensorDataList = await getSensorData();
  return c.json(sensorDataList);
}

/**
 * Get a specific sensor data by their ID
 * @param c - Hono Context containing the sensor data ID parameter
 * @returns JSON response with sensor data if found
 * @throws NotFoundError if sensor data doesn't exist or is deleted
 */
export async function getSensorDataByIdController(c: Context) {
  const id = parseSensorDataId(c.req.param('id'));
  const sensorDataItem = await getSensorDataById(id);
  return c.json(sensorDataItem);
}

/**
 * Create a new sensor data
 * @param c - Hono Context containing the sensor data in request body
 * @returns JSON response with created sensor data and 201 status
 * @throws ValidationError if request body is invalid
 */
export async function createSensorDataController(c: Context) {
  const body = await c.req.json();
  const validatedData = validateCreateSensorData(body);
  const createdSensorData = await createSensorData(validatedData);
  return c.json(createdSensorData, StatusCodes.CREATED);
}

/**
 * Update an existing sensor data's information
 * @param c - Hono Context containing sensor data ID and update data
 * @returns JSON response with updated sensor data
 * @throws NotFoundError if sensor data doesn't exist or is deleted
 * @throws ValidationError if update data is invalid
 */
export async function updateSensorDataController(c: Context) {
  const id = parseSensorDataId(c.req.param('id'));
  const body = await c.req.json();
  const validatedData = validateUpdateSensorData(body);
  const updatedSensorData = await updateSensorData(id, validatedData);
  return c.json(updatedSensorData);
}

/**
 * Soft delete a sensor data (marks as deleted but keeps in database)
 * @param c - Hono Context containing the sensor data ID to delete
 * @returns JSON response with deleted sensor data
 * @throws NotFoundError if sensor data doesn't exist or is already deleted
 */
export async function deleteSensorDataController(c: Context) {
  const id = parseSensorDataId(c.req.param('id'));
  const deletedSensorData = await deleteSensorData(id);
  return c.json(deletedSensorData);
}
