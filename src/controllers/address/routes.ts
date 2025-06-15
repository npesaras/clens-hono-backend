/**
 * Address Routes Configuration
 * This module defines all address-related API endpoints
 */

import { authenticationMiddleware } from "@/middlewares/authentication.js";
import { Hono } from "hono";
import {
  createAddressController,
  deleteAddressController,
  getAddressController,
  getAddressesController,
  updateAddressController,
} from "./addressControllers.js";

/**
 * Address Router Configuration
 * All routes require authentication
 * 
 * Available endpoints:
 * - GET    /address     - Retrieve all address records
 * - POST   /address     - Create a new address record
 * - GET    /address/:id - Get a specific address by ID
 * - PUT    /address/:id - Update a specific address record
 * - DELETE /address/:id - Delete (soft-delete) a specific address record
 */
const router = new Hono()
  // Get all address records (requires authentication)
  .get("/address", authenticationMiddleware, getAddressesController)
  
  // Create a new address record (requires authentication)
  .post("/address", authenticationMiddleware, createAddressController)
  
  // Get a specific address by ID (requires authentication)
  .get("/address/:id", authenticationMiddleware, getAddressController)
  
  // Delete an address record (soft-delete) (requires authentication)
  .delete("/address/:id", authenticationMiddleware, deleteAddressController)
  
  // Update an address record (requires authentication)
  .put("/address/:id", authenticationMiddleware, updateAddressController);

export default router;
