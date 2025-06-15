/**
 * Trash Record Routes Configuration
 * This module defines all trash record-related API endpoints
 */

import { authenticationMiddleware } from "@/middlewares/authentication.js";
import { Hono } from "hono";
import {
  createTrashRecordController,
  deleteTrashRecordController,
  getTrashRecordController,
  getTrashRecordsController,
  updateTrashRecordController,
} from "./trashRecordControllers.js";

/**
 * Trash Record Router Configuration
 * All routes require authentication
 * 
 * Available endpoints:
 * - GET    /trash-records      - Retrieve all trash records
 * - POST   /trash-records      - Create a new trash record
 * - GET    /trash-records/:id  - Get a specific trash record by ID
 * - PUT    /trash-records/:id  - Update a specific trash record
 * - DELETE /trash-records/:id  - Delete (soft-delete) a specific trash record
 */
const router = new Hono()
  // Get all trash records (requires authentication)
  .get("/trash-records", authenticationMiddleware, getTrashRecordsController)
  
  // Create a new trash record (requires authentication)
  .post("/trash-records", authenticationMiddleware, createTrashRecordController)
  
  // Get a specific trash record by ID (requires authentication)
  .get("/trash-records/:id", authenticationMiddleware, getTrashRecordController)
  
  // Delete a trash record (soft-delete) (requires authentication)
  .delete("/trash-records/:id", authenticationMiddleware, deleteTrashRecordController)
  
  // Update a trash record's information (requires authentication)
  .put("/trash-records/:id", authenticationMiddleware, updateTrashRecordController);

export default router;
