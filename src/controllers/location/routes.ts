/**
 * Location Routes Configuration
 * This module defines all location-related API endpoints
 */

import { authenticationMiddleware } from "@/middlewares/authentication.js";
import { Hono } from "hono";
import {
  createLocationController,
  deleteLocationController,
  getLocationController,
  getLocationsController,
  updateLocationController,
} from "./locationControllers.js";

/**
 * Location Router Configuration
 * All routes require authentication
 * 
 * Available endpoints:
 * - GET    /locations      - Retrieve all locations
 * - POST   /locations      - Create a new location
 * - GET    /locations/:id  - Get a specific location by ID
 * - PUT    /locations/:id  - Update a specific location
 * - DELETE /locations/:id  - Delete (soft-delete) a specific location
 */
const router = new Hono()
  // Get all locations (requires authentication)
  .get("/locations", authenticationMiddleware, getLocationsController)
  
  // Create a new location (requires authentication)
  .post("/locations", authenticationMiddleware, createLocationController)
  
  // Get a specific location by ID (requires authentication)
  .get("/locations/:id", authenticationMiddleware, getLocationController)
  
  // Delete a location (soft-delete) (requires authentication)
  .delete("/locations/:id", authenticationMiddleware, deleteLocationController)
  
  // Update a location's information (requires authentication)
  .put("/locations/:id", authenticationMiddleware, updateLocationController);

export default router;
