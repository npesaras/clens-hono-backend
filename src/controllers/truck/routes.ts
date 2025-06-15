/**
 * Truck Routes Configuration
 * This module defines all truck-related API endpoints
 */

import { Hono } from 'hono';

import {
  createTruckController,
  deleteTruckController,
  getTruckController,
  getTrucksController,
  updateTruckController,
} from './truckControllers.js';

import { authenticationMiddleware } from '@/middlewares/authentication.js';

/**
 * Truck Router Configuration
 * All routes require authentication
 *
 * Available endpoints:
 * - GET    /trucks      - Retrieve all trucks
 * - POST   /trucks      - Create a new truck
 * - GET    /trucks/:id  - Get a specific truck by ID
 * - PUT    /trucks/:id  - Update a specific truck
 * - DELETE /trucks/:id  - Delete (soft-delete) a specific truck
 */
const router = new Hono()
  // Get all trucks (requires authentication)
  .get('/trucks', authenticationMiddleware, getTrucksController)

  // Create a new truck (requires authentication)
  .post('/trucks', authenticationMiddleware, createTruckController)

  // Get a specific truck by ID (requires authentication)
  .get('/trucks/:id', authenticationMiddleware, getTruckController)

  // Delete a truck (soft-delete) (requires authentication)
  .delete('/trucks/:id', authenticationMiddleware, deleteTruckController)

  // Update a truck's information (requires authentication)
  .put('/trucks/:id', authenticationMiddleware, updateTruckController);

export default router;
