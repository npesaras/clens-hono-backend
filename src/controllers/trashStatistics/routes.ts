/**
 * Trash Statistics Routes Configuration
 * This module defines all trash statistics-related API endpoints
 */

import { authenticationMiddleware } from "@/middlewares/authentication.js";
import { Hono } from "hono";
import {
  createTrashStatisticsController,
  deleteTrashStatisticsController,
  getTrashStatisticsByIdController,
  getTrashStatisticsController,
  updateTrashStatisticsController,
} from "./trashStatisticsControllers.js";

/**
 * Trash Statistics Router Configuration
 * All routes require authentication
 * 
 * Available endpoints:
 * - GET    /trash-statistics      - Retrieve all trash statistics
 * - POST   /trash-statistics      - Create a new trash statistics
 * - GET    /trash-statistics/:id  - Get a specific trash statistics by ID
 * - PUT    /trash-statistics/:id  - Update a specific trash statistics
 * - DELETE /trash-statistics/:id  - Delete (soft-delete) a specific trash statistics
 */
const router = new Hono()
  // Get all trash statistics (requires authentication)
  .get("/trash-statistics", authenticationMiddleware, getTrashStatisticsController)
  
  // Create a new trash statistics (requires authentication)
  .post("/trash-statistics", authenticationMiddleware, createTrashStatisticsController)
  
  // Get a specific trash statistics by ID (requires authentication)
  .get("/trash-statistics/:id", authenticationMiddleware, getTrashStatisticsByIdController)
  
  // Delete a trash statistics (soft-delete) (requires authentication)
  .delete("/trash-statistics/:id", authenticationMiddleware, deleteTrashStatisticsController)
  
  // Update a trash statistics' information (requires authentication)
  .put("/trash-statistics/:id", authenticationMiddleware, updateTrashStatisticsController);

export default router;
