import { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';

import {
  createTruck,
  deleteTruck,
  getTruckById,
  getTrucks,
  updateTruck,
} from '@/services/truckService';
import {
  validateCreateTruck,
  validateUpdateTruck,
  parseTruckId,
} from '@/utils/truck/truckUtil';

/**
 * Get all active trucks (non-deleted trucks)
 * @param c - Hono Context
 * @returns JSON response with array of trucks
 */
export async function getTrucksController(c: Context) {
  const trucks = await getTrucks();
  return c.json(trucks);
}

/**
 * Get a specific truck by their ID
 * @param c - Hono Context containing the truck ID parameter
 * @returns JSON response with truck data if found
 * @throws NotFoundError if truck doesn't exist or is deleted
 */
export async function getTruckController(c: Context) {
  const id = parseTruckId(c.req.param('id'));
  const truckData = await getTruckById(id);
  return c.json(truckData);
}

/**
 * Create a new truck
 * @param c - Hono Context containing the truck data in request body
 * @returns JSON response with created truck data and 201 status
 * @throws ValidationError if request body is invalid
 */
export async function createTruckController(c: Context) {
  const body = await c.req.json();
  const validatedData = validateCreateTruck(body);
  const createdTruck = await createTruck(validatedData);
  return c.json(createdTruck, StatusCodes.CREATED);
}

/**
 * Update an existing truck's information
 * @param c - Hono Context containing truck ID and update data
 * @returns JSON response with updated truck data
 * @throws NotFoundError if truck doesn't exist or is deleted
 * @throws ValidationError if update data is invalid
 */
export async function updateTruckController(c: Context) {
  const id = parseTruckId(c.req.param('id'));
  const body = await c.req.json();
  const validatedData = validateUpdateTruck(body);
  const updatedTruck = await updateTruck(id, validatedData);
  return c.json(updatedTruck);
}

/**
 * Soft delete a truck (marks as deleted but keeps in database)
 * @param c - Hono Context containing the truck ID to delete
 * @returns JSON response with deleted truck data
 * @throws NotFoundError if truck doesn't exist or is already deleted
 */
export async function deleteTruckController(c: Context) {
  const id = parseTruckId(c.req.param('id'));
  const deletedTruck = await deleteTruck(id);
  return c.json(deletedTruck);
}
