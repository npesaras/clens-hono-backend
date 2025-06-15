/**
 * Truck Route Routes Configuration
 * This module defines all truck route-related API endpoints
 */

import { authenticationMiddleware } from "@/middlewares/authentication.js";
import { Hono } from "hono";
import {
  createTruckRouteController,
  deleteTruckRouteController,
  getTruckRouteController,
  getTruckRoutesController,
  updateTruckRouteController,
} from "./truckRouteControllers.js";

/**
 * Truck Route Router Configuration
 * All routes require authentication
 * 
 * Available endpoints:
 * - GET    /truck-routes      - Retrieve all truck routes
 * - POST   /truck-routes      - Create a new truck route
 * - GET    /truck-routes/:id  - Get a specific truck route by ID
 * - PUT    /truck-routes/:id  - Update a specific truck route
 * - DELETE /truck-routes/:id  - Delete a specific truck route
 */
const router = new Hono()
  // Get all truck routes (requires authentication)
  .get("/truck-routes", authenticationMiddleware, getTruckRoutesController)
  
  // Create a new truck route (requires authentication)
  .post("/truck-routes", authenticationMiddleware, createTruckRouteController)
  
  // Get a specific truck route by ID (requires authentication)
  .get("/truck-routes/:id", authenticationMiddleware, getTruckRouteController)
  
  // Delete a truck route (requires authentication)
  .delete("/truck-routes/:id", authenticationMiddleware, deleteTruckRouteController)
  
  // Update a truck route's information (requires authentication)
  .put("/truck-routes/:id", authenticationMiddleware, updateTruckRouteController);

export default router;
