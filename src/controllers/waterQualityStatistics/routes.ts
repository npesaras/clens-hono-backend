/**
 * Water Quality Statistics Routes Configuration
 * This module defines all water quality statistics-related API endpoints
 */

import { authenticationMiddleware } from "@/middlewares/authentication.js";
import { Hono } from "hono";
import {
  createWaterQualityStatisticsController,
  deleteWaterQualityStatisticsController,
  getWaterQualityStatisticsByKeyController,
  getWaterQualityStatisticsController,
  updateWaterQualityStatisticsController,
} from "./waterQualityStatisticsControllers.js";

/**
 * Water Quality Statistics Router Configuration
 * All routes require authentication
 * 
 * Available endpoints:
 * - GET    /water-quality-statistics                        - Retrieve all water quality statistics
 * - POST   /water-quality-statistics                        - Create a new water quality statistics
 * - GET    /water-quality-statistics/:interval/:startDate   - Get a specific water quality statistics by composite key
 * - PUT    /water-quality-statistics/:interval/:startDate   - Update a specific water quality statistics
 * - DELETE /water-quality-statistics/:interval/:startDate   - Delete a specific water quality statistics
 */
const router = new Hono()
  // Get all water quality statistics (requires authentication)
  .get("/water-quality-statistics", authenticationMiddleware, getWaterQualityStatisticsController)
  
  // Create a new water quality statistics (requires authentication)
  .post("/water-quality-statistics", authenticationMiddleware, createWaterQualityStatisticsController)
  
  // Get a specific water quality statistics by composite key (requires authentication)
  .get("/water-quality-statistics/:interval/:startDate", authenticationMiddleware, getWaterQualityStatisticsByKeyController)
  
  // Delete a water quality statistics (requires authentication)
  .delete("/water-quality-statistics/:interval/:startDate", authenticationMiddleware, deleteWaterQualityStatisticsController)
  
  // Update a water quality statistics' information (requires authentication)
  .put("/water-quality-statistics/:interval/:startDate", authenticationMiddleware, updateWaterQualityStatisticsController);

export default router;
