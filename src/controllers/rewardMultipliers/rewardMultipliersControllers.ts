/**
 * Reward Multipliers Controllers
 * This module contains all reward multipliers-related request handlers
 */

import type { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';

import {
  createRewardMultipliers,
  getRewardMultipliers,
  getRewardMultipliersById,
  updateRewardMultipliers,
  deleteRewardMultipliers,
} from '@/services/rewardMultipliersService.js';
import {
  validateCreateRewardMultipliers,
  validateUpdateRewardMultipliers,
  parseRewardMultipliersId,
} from '@/utils/rewardMultipliers/rewardMultipliersUtil.js';

/**
 * Get all reward multipliers
 * @param c - Hono Context
 * @returns JSON response with array of reward multipliers records
 */
export async function getRewardMultipliersController(c: Context) {
  const rewardMultipliersList = await getRewardMultipliers();
  return c.json(rewardMultipliersList);
}

/**
 * Get a specific reward multipliers by ID
 * @param c - Hono Context containing reward multipliers ID in params
 * @returns JSON response with reward multipliers data
 * @throws NotFoundError if reward multipliers doesn't exist
 */
export async function getRewardMultipliersByIdController(c: Context) {
  const id = parseRewardMultipliersId(c.req.param('id'));
  const rewardMultipliersData = await getRewardMultipliersById(id);
  return c.json(rewardMultipliersData);
}

/**
 * Create a new reward multipliers record
 * @param c - Hono Context containing reward multipliers data in request body
 * @returns JSON response with created reward multipliers data
 * @throws ValidationError if request data is invalid
 */
export async function createRewardMultipliersController(c: Context) {
  const body = await c.req.json();
  const validatedData = validateCreateRewardMultipliers(body);
  const createdRewardMultipliers = await createRewardMultipliers(validatedData);
  return c.json(createdRewardMultipliers, StatusCodes.CREATED);
}

/**
 * Update an existing reward multipliers' information
 * @param c - Hono Context containing reward multipliers ID and update data
 * @returns JSON response with updated reward multipliers data
 * @throws NotFoundError if reward multipliers doesn't exist
 * @throws ValidationError if update data is invalid
 */
export async function updateRewardMultipliersController(c: Context) {
  const id = parseRewardMultipliersId(c.req.param('id'));
  const body = await c.req.json();
  const validatedData = validateUpdateRewardMultipliers(body);
  const updatedRewardMultipliers = await updateRewardMultipliers(
    id,
    validatedData
  );
  return c.json(updatedRewardMultipliers);
}

/**
 * Delete a reward multipliers
 * @param c - Hono Context containing the reward multipliers ID to delete
 * @returns JSON response with deleted reward multipliers data
 * @throws NotFoundError if reward multipliers doesn't exist
 */
export async function deleteRewardMultipliersController(c: Context) {
  const id = parseRewardMultipliersId(c.req.param('id'));
  const deletedRewardMultipliers = await deleteRewardMultipliers(id);
  return c.json(deletedRewardMultipliers);
}
