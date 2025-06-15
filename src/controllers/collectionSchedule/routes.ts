/**
 * Collection Schedule Routes Configuration
 * This module defines all collection schedule-related API endpoints
 */

import { Hono } from 'hono';

import {
  createCollectionScheduleController,
  deleteCollectionScheduleController,
  getCollectionScheduleController,
  getCollectionSchedulesController,
  updateCollectionScheduleController,
} from './collectionScheduleControllers.js';

import { authenticationMiddleware } from '@/middlewares/authentication.js';

/**
 * Collection Schedule Router Configuration
 * All routes require authentication
 *
 * Available endpoints:
 * - GET    /collection-schedules      - Retrieve all collection schedules
 * - POST   /collection-schedules      - Create a new collection schedule
 * - GET    /collection-schedules/:id  - Get a specific collection schedule by ID
 * - PUT    /collection-schedules/:id  - Update a specific collection schedule
 * - DELETE /collection-schedules/:id  - Delete a specific collection schedule
 */
const router = new Hono()
  // Get all collection schedules (requires authentication)
  .get(
    '/collection-schedules',
    authenticationMiddleware,
    getCollectionSchedulesController
  )

  // Create a new collection schedule (requires authentication)
  .post(
    '/collection-schedules',
    authenticationMiddleware,
    createCollectionScheduleController
  )

  // Get a specific collection schedule by ID (requires authentication)
  .get(
    '/collection-schedules/:id',
    authenticationMiddleware,
    getCollectionScheduleController
  )

  // Delete a collection schedule (requires authentication)
  .delete(
    '/collection-schedules/:id',
    authenticationMiddleware,
    deleteCollectionScheduleController
  )

  // Update a collection schedule's information (requires authentication)
  .put(
    '/collection-schedules/:id',
    authenticationMiddleware,
    updateCollectionScheduleController
  );

export default router;
