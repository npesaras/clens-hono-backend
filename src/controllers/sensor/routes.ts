/**
 * Sensor Routes Configuration
 * This module defines all sensor-related API endpoints
 */

import { authenticationMiddleware } from "@/middlewares/authentication.js";
import { Hono } from "hono";
import {
  createSensorController,
  deleteSensorController,
  getSensorController,
  getSensorsController,
  updateSensorController,
} from "./sensorControllers.js";

/**
 * Sensor Router Configuration
 * All routes require authentication
 * 
 * Available endpoints:
 * - GET    /sensors      - Retrieve all sensors
 * - POST   /sensors      - Create a new sensor
 * - GET    /sensors/:id  - Get a specific sensor by ID
 * - PUT    /sensors/:id  - Update a specific sensor
 * - DELETE /sensors/:id  - Delete a specific sensor
 */
const router = new Hono()
  // Get all sensors (requires authentication)
  .get("/sensors", authenticationMiddleware, getSensorsController)
  
  // Create a new sensor (requires authentication)
  .post("/sensors", authenticationMiddleware, createSensorController)
  
  // Get a specific sensor by ID (requires authentication)
  .get("/sensors/:id", authenticationMiddleware, getSensorController)
  
  // Delete a sensor (requires authentication)
  .delete("/sensors/:id", authenticationMiddleware, deleteSensorController)
  
  // Update a sensor's information (requires authentication)
  .put("/sensors/:id", authenticationMiddleware, updateSensorController);

export default router;
