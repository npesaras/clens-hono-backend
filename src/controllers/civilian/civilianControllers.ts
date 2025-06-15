/**
 * Civilian Controllers
 * This module contains all civilian-related request handlers
 */

import type { Context } from 'hono';

import {
  createCivilian,
  getCivilians,
  getCivilianById,
  getCivilianByUserId,
  updateCivilian,
  deleteCivilian,
  getCivilianLeaderboard,
} from '@/services/civilianService.js';
import {
  validateCreateCivilian,
  validateUpdateCivilian,
  parseCivilianId,
} from '@/utils/civilian/civilianUtil.js';
import { BadRequestError } from '@/utils/error.js';

/**
 * Get all civilians with their associated user information
 * @param c - Hono Context
 * @returns JSON response with array of civilian records
 */
export async function getCiviliansController(c: Context) {
  const civilians = await getCivilians();
  return c.json(civilians);
}

/**
 * Get a specific civilian by ID with associated user information
 * @param c - Hono Context containing civilian ID in params
 * @returns JSON response with civilian data
 * @throws NotFoundError if civilian doesn't exist or is deleted
 */
export async function getCivilianController(c: Context) {
  const civilianId = parseCivilianId(c.req.param('id'));
  const civilian = await getCivilianById(civilianId);
  return c.json(civilian);
}

/**
 * Get civilian record by user ID
 * @param c - Hono Context containing user ID in params
 * @returns JSON response with civilian data
 * @throws NotFoundError if civilian doesn't exist for the user
 */
export async function getCivilianByUserController(c: Context) {
  const userId = parseCivilianId(c.req.param('userId'));
  const civilian = await getCivilianByUserId(userId);
  return c.json(civilian);
}

/**
 * Create a new civilian record
 * @param c - Hono Context containing civilian data in request body
 * @returns JSON response with created civilian data
 * @throws BadRequestError if request data is invalid
 * @throws NotFoundError if referenced user doesn't exist
 */
export async function createCivilianController(c: Context) {
  const body = await c.req.json();
  const validatedData = validateCreateCivilian(body);
  const civilian = await createCivilian(validatedData);
  return c.json(civilian, 201);
}

/**
 * Update an existing civilian's information
 * @param c - Hono Context containing civilian ID and update data
 * @returns JSON response with updated civilian data
 * @throws NotFoundError if civilian doesn't exist or is deleted
 * @throws BadRequestError if update data is invalid
 */
export async function updateCivilianController(c: Context) {
  const civilianId = parseCivilianId(c.req.param('id'));
  const body = await c.req.json();
  const validatedData = validateUpdateCivilian(body);
  const civilian = await updateCivilian(civilianId, validatedData);
  return c.json(civilian);
}

/**
 * Soft delete a civilian (marks as deleted but keeps in database)
 * @param c - Hono Context containing the civilian ID to delete
 * @returns JSON response with deleted civilian data
 * @throws NotFoundError if civilian doesn't exist or is already deleted
 */
export async function deleteCivilianController(c: Context) {
  const civilianId = parseCivilianId(c.req.param('id'));
  const civilian = await deleteCivilian(civilianId);
  return c.json(civilian);
}

/**
 * Get civilian leaderboard ordered by points
 * @param c - Hono Context with optional limit query parameter
 * @returns JSON response with leaderboard data
 */
export async function getCivilianLeaderboardController(c: Context) {
  const limitParam = c.req.query('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : 10;

  if (isNaN(limit) || limit < 1 || limit > 100) {
    throw new BadRequestError('Limit must be a number between 1 and 100');
  }

  const leaderboard = await getCivilianLeaderboard(limit);
  return c.json(leaderboard);
}
