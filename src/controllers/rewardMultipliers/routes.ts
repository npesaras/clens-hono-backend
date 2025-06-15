/**
 * Reward Multipliers Routes Configuration
 * This module defines all reward multipliers-related API endpoints
 */

import { Hono } from 'hono';

import {
  createRewardMultipliersController,
  deleteRewardMultipliersController,
  getRewardMultipliersByIdController,
  getRewardMultipliersController,
  updateRewardMultipliersController,
} from './rewardMultipliersControllers.js';

import { authenticationMiddleware } from '@/middlewares/authentication.js';

/**
 * Reward Multipliers Router Configuration
 * All routes require authentication
 *
 * Available endpoints:
 * - GET    /reward-multipliers      - Retrieve all reward multipliers
 * - POST   /reward-multipliers      - Create a new reward multipliers
 * - GET    /reward-multipliers/:id  - Get a specific reward multipliers by ID
 * - PUT    /reward-multipliers/:id  - Update a specific reward multipliers
 * - DELETE /reward-multipliers/:id  - Delete a specific reward multipliers
 */
const router = new Hono()
  // Get all reward multipliers (requires authentication)
  .get(
    '/reward-multipliers',
    authenticationMiddleware,
    getRewardMultipliersController
  )

  // Create a new reward multipliers (requires authentication)
  .post(
    '/reward-multipliers',
    authenticationMiddleware,
    createRewardMultipliersController
  )

  // Get a specific reward multipliers by ID (requires authentication)
  .get(
    '/reward-multipliers/:id',
    authenticationMiddleware,
    getRewardMultipliersByIdController
  )

  // Delete a reward multipliers (requires authentication)
  .delete(
    '/reward-multipliers/:id',
    authenticationMiddleware,
    deleteRewardMultipliersController
  )

  // Update a reward multipliers' information (requires authentication)
  .put(
    '/reward-multipliers/:id',
    authenticationMiddleware,
    updateRewardMultipliersController
  );

export default router;
