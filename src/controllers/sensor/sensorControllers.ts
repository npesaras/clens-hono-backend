import { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';

import {
  createSensor,
  deleteSensor,
  getSensorById,
  getSensors,
  updateSensor,
} from '@/services/sensorService';
import {
  validateCreateSensor,
  validateUpdateSensor,
  parseSensorId,
} from '@/utils/sensor/sensorUtil';

/**
 * Get all sensors
 * @param c - Hono Context
 * @returns JSON response with array of sensors
 */
export async function getSensorsController(c: Context) {
  const sensors = await getSensors();
  return c.json(sensors);
}

/**
 * Get a specific sensor by their ID
 * @param c - Hono Context containing the sensor ID parameter
 * @returns JSON response with sensor data if found
 * @throws NotFoundError if sensor doesn't exist
 */
export async function getSensorController(c: Context) {
  const id = parseSensorId(c.req.param('id'));
  const sensorData = await getSensorById(id);
  return c.json(sensorData);
}

/**
 * Create a new sensor
 * @param c - Hono Context containing the sensor data in request body
 * @returns JSON response with created sensor data and 201 status
 * @throws ValidationError if request body is invalid
 */
export async function createSensorController(c: Context) {
  const body = await c.req.json();
  const validatedData = validateCreateSensor(body);
  const createdSensor = await createSensor(validatedData);
  return c.json(createdSensor, StatusCodes.CREATED);
}

/**
 * Update an existing sensor's information
 * @param c - Hono Context containing sensor ID and update data
 * @returns JSON response with updated sensor data
 * @throws NotFoundError if sensor doesn't exist
 * @throws ValidationError if update data is invalid
 */
export async function updateSensorController(c: Context) {
  const id = parseSensorId(c.req.param('id'));
  const body = await c.req.json();
  const validatedData = validateUpdateSensor(body);
  const updatedSensor = await updateSensor(id, validatedData);
  return c.json(updatedSensor);
}

/**
 * Delete a sensor
 * @param c - Hono Context containing the sensor ID to delete
 * @returns JSON response with deleted sensor data
 * @throws NotFoundError if sensor doesn't exist
 */
export async function deleteSensorController(c: Context) {
  const id = parseSensorId(c.req.param('id'));
  const deletedSensor = await deleteSensor(id);
  return c.json(deletedSensor);
}
