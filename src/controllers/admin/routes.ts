/**
 * Admin Routes Configuration
 * This module defines all admin-related API endpoints
 */

import { authenticationMiddleware } from "@/middlewares/authentication.js";
import { Hono } from "hono";
import {
  createAdminController,
  deleteAdminController,
  getAdminController,
  getAdminsController,
  getAdminByUserController,
  updateAdminController,
} from "./adminControllers.js";

/**
 * Admin Router Configuration
 * All routes require authentication
 * 
 * Available endpoints:
 * - GET    /admin          - Retrieve all admin records
 * - POST   /admin          - Create a new admin record
 * - GET    /admin/:id      - Get a specific admin by ID
 * - PUT    /admin/:id      - Update a specific admin record
 * - DELETE /admin/:id      - Delete (soft-delete) a specific admin record
 * - GET    /admin/user/:userId - Get admin record by user ID
 */
const router = new Hono()
  // Get all admin records (requires authentication)
  .get("/admin", authenticationMiddleware, getAdminsController)
  
  // Create a new admin record (requires authentication)
  .post("/admin", authenticationMiddleware, createAdminController)
  
  // Get a specific admin by ID (requires authentication)
  .get("/admin/:id", authenticationMiddleware, getAdminController)
  
  // Delete an admin record (soft-delete) (requires authentication)
  .delete("/admin/:id", authenticationMiddleware, deleteAdminController)
  
  // Update an admin record (requires authentication)
  .put("/admin/:id", authenticationMiddleware, updateAdminController)
  
  // Get admin record by user ID (requires authentication)
  .get("/admin/user/:userId", authenticationMiddleware, getAdminByUserController);

export default router;