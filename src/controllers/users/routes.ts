/**
 * User Routes Configuration
 * This module defines all user-related API endpoints
 */

import { authenticationMiddleware } from "@/middlewares/authentication.js";
import { Hono } from "hono";
import {
  createUserController,
  deleteUserController,
  getUserController,
  getUsersController,
  updateUserController,
} from "./index.js";

/**
 * User Router Configuration
 * All routes except /users/public require authentication
 * 
 * Available endpoints:
 * - GET    /users      - Retrieve all users
 * - POST   /users      - Create a new user
 * - GET    /users/:id  - Get a specific user by ID
 * - PUT    /users/:id  - Update a specific user
 * - DELETE /users/:id  - Delete (soft-delete) a specific user
 */
const router = new Hono()
  // Get all users (requires authentication)
  .get("/users", authenticationMiddleware, getUsersController)
  
  // Create a new user (requires authentication)
  .post("/users", authenticationMiddleware, createUserController)
  
  // Get a specific user by ID (requires authentication)
  .get("/users/:id", authenticationMiddleware, getUserController)
  
  // Delete a user (soft-delete) (requires authentication)
  .delete("/users/:id", authenticationMiddleware, deleteUserController)
  
  // Update a user's information (requires authentication)
  .put("/users/:id", authenticationMiddleware, updateUserController);

export default router;