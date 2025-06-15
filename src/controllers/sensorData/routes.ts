/**
 * Sensor Data Routes Configuration
 * This module defines all sensor data-related API endpoints
 */

import { authenticationMiddleware } from "@/middlewares/authentication.js";
import { Hono } from "hono";
import {
  createSensorDataController,
  deleteSensorDataController,
  getSensorDataByIdController,
  getSensorDataController,
  updateSensorDataController,
} from "./sensorDataControllers.js";

/**
 * Sensor Data Router Configuration
 * All routes require authentication
 * 
 * Available endpoints:
 * - GET    /sensor-data      - Retrieve all sensor data
 * - POST   /sensor-data      - Create a new sensor data
 * - GET    /sensor-data/:id  - Get a specific sensor data by ID
 * - PUT    /sensor-data/:id  - Update a specific sensor data
 * - DELETE /sensor-data/:id  - Delete (soft-delete) a specific sensor data
 */
const router = new Hono()
  // Get all sensor data (requires authentication)
  .get("/sensor-data", authenticationMiddleware, getSensorDataController)
  
  // Create a new sensor data (requires authentication)
  .post("/sensor-data", authenticationMiddleware, createSensorDataController)
  
  // Get a specific sensor data by ID (requires authentication)
  .get("/sensor-data/:id", authenticationMiddleware, getSensorDataByIdController)
  
  // Delete a sensor data (soft-delete) (requires authentication)
  .delete("/sensor-data/:id", authenticationMiddleware, deleteSensorDataController)
  
  // Update a sensor data's information (requires authentication)
  .put("/sensor-data/:id", authenticationMiddleware, updateSensorDataController);

export default router;
