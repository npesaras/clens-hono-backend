import { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';

import {
  createTruckRoute,
  deleteTruckRoute,
  getTruckRouteById,
  getTruckRoutes,
  updateTruckRoute,
} from '@/services/truckRouteService';
import {
  validateCreateTruckRoute,
  validateUpdateTruckRoute,
  parseTruckRouteId,
} from '@/utils/truckRoute/truckRouteUtil';

/**
 * Get all truck routes
 * @param c - Hono Context
 * @returns JSON response with array of truck routes
 */
export async function getTruckRoutesController(c: Context) {
  const truckRoutes = await getTruckRoutes();
  return c.json(truckRoutes);
}

/**
 * Get a specific truck route by their ID
 * @param c - Hono Context containing the truck route ID parameter
 * @returns JSON response with truck route data if found
 * @throws NotFoundError if truck route doesn't exist
 */
export async function getTruckRouteController(c: Context) {
  const id = parseTruckRouteId(c.req.param('id'));
  const truckRouteData = await getTruckRouteById(id);
  return c.json(truckRouteData);
}

/**
 * Create a new truck route
 * @param c - Hono Context containing the truck route data in request body
 * @returns JSON response with created truck route data and 201 status
 * @throws ValidationError if request body is invalid
 */
export async function createTruckRouteController(c: Context) {
  const body = await c.req.json();
  const validatedData = validateCreateTruckRoute(body);
  const createdTruckRoute = await createTruckRoute(validatedData);
  return c.json(createdTruckRoute, StatusCodes.CREATED);
}

/**
 * Update an existing truck route's information
 * @param c - Hono Context containing truck route ID and update data
 * @returns JSON response with updated truck route data
 * @throws NotFoundError if truck route doesn't exist
 * @throws ValidationError if update data is invalid
 */
export async function updateTruckRouteController(c: Context) {
  const id = parseTruckRouteId(c.req.param('id'));
  const body = await c.req.json();
  const validatedData = validateUpdateTruckRoute(body);
  const updatedTruckRoute = await updateTruckRoute(id, validatedData);
  return c.json(updatedTruckRoute);
}

/**
 * Delete a truck route
 * @param c - Hono Context containing the truck route ID to delete
 * @returns JSON response with deleted truck route data
 * @throws NotFoundError if truck route doesn't exist
 */
export async function deleteTruckRouteController(c: Context) {
  const id = parseTruckRouteId(c.req.param('id'));
  const deletedTruckRoute = await deleteTruckRoute(id);
  return c.json(deletedTruckRoute);
}
