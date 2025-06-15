/**
 * Civilian Routes Configuration
 * This module defines all civilian-related API endpoints
 */

import { Hono } from 'hono';

import {
  createCivilianController,
  deleteCivilianController,
  getCivilianController,
  getCiviliansController,
  getCivilianByUserController,
  updateCivilianController,
  getCivilianLeaderboardController,
} from './civilianControllers.js';

import { authenticationMiddleware } from '@/middlewares/authentication.js';

/**
 * Civilian Router Configuration
 * All routes require authentication
 *
 * Available endpoints:
 * - GET    /civilian               - Retrieve all civilian records
 * - POST   /civilian               - Create a new civilian record
 * - GET    /civilian/:id           - Get a specific civilian by ID
 * - PUT    /civilian/:id           - Update a specific civilian record
 * - DELETE /civilian/:id           - Delete (soft-delete) a specific civilian record
 * - GET    /civilian/user/:userId  - Get civilian record by user ID
 * - GET    /civilian/leaderboard   - Get civilian leaderboard
 */
const router = new Hono()
  // Get all civilian records (requires authentication)
  .get('/civilian', authenticationMiddleware, getCiviliansController)

  // Create a new civilian record (requires authentication)
  .post('/civilian', authenticationMiddleware, createCivilianController)

  // Get civilian leaderboard (requires authentication)
  .get(
    '/civilian/leaderboard',
    authenticationMiddleware,
    getCivilianLeaderboardController
  )

  // Get a specific civilian by ID (requires authentication)
  .get('/civilian/:id', authenticationMiddleware, getCivilianController)

  // Delete a civilian record (soft-delete) (requires authentication)
  .delete('/civilian/:id', authenticationMiddleware, deleteCivilianController)

  // Update a civilian record (requires authentication)
  .put('/civilian/:id', authenticationMiddleware, updateCivilianController)

  // Get civilian record by user ID (requires authentication)
  .get(
    '/civilian/user/:userId',
    authenticationMiddleware,
    getCivilianByUserController
  );

export default router;
