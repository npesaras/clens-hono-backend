import { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { createLocation, deleteLocation, getLocationById, getLocations, updateLocation } from '@/services/locationService';
import { validateCreateLocation, validateUpdateLocation, parseLocationId } from '@/utils/location/locationUtil';

/**
 * Get all active locations (non-deleted locations)
 * @param c - Hono Context
 * @returns JSON response with array of locations
 */
export async function getLocationsController(c: Context) {
  const locations = await getLocations();
  return c.json(locations);
}

/**
 * Get a specific location by their ID
 * @param c - Hono Context containing the location ID parameter
 * @returns JSON response with location data if found
 * @throws NotFoundError if location doesn't exist or is deleted
 */
export async function getLocationController(c: Context) {
  const id = parseLocationId(c.req.param('id'));
  const locationData = await getLocationById(id);
  return c.json(locationData);
}

/**
 * Create a new location
 * @param c - Hono Context containing the location data in request body
 * @returns JSON response with created location data and 201 status
 * @throws ValidationError if request body is invalid
 */
export async function createLocationController(c: Context) {
  const body = await c.req.json();
  const validatedData = validateCreateLocation(body);
  const createdLocation = await createLocation(validatedData);
  return c.json(createdLocation, StatusCodes.CREATED);
}

/**
 * Update an existing location's information
 * @param c - Hono Context containing location ID and update data
 * @returns JSON response with updated location data
 * @throws NotFoundError if location doesn't exist or is deleted
 * @throws ValidationError if update data is invalid
 */
export async function updateLocationController(c: Context) {
  const id = parseLocationId(c.req.param('id'));
  const body = await c.req.json();
  const validatedData = validateUpdateLocation(body);
  const updatedLocation = await updateLocation(id, validatedData);
  return c.json(updatedLocation);
}

/**
 * Soft delete a location (marks as deleted but keeps in database)
 * @param c - Hono Context containing the location ID to delete
 * @returns JSON response with deleted location data
 * @throws NotFoundError if location doesn't exist or is already deleted
 */
export async function deleteLocationController(c: Context) {
  const id = parseLocationId(c.req.param('id'));
  const deletedLocation = await deleteLocation(id);
  return c.json(deletedLocation);
}
