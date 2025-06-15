/**
 * Collection Schedule Controllers
 * This module contains all collection schedule-related request handlers
 */

import type { Context } from "hono";
import { StatusCodes } from 'http-status-codes';
import { 
  createCollectionSchedule, 
  getCollectionSchedules, 
  getCollectionScheduleById, 
  updateCollectionSchedule, 
  deleteCollectionSchedule 
} from "@/services/collectionScheduleService.js";
import { 
  validateCreateCollectionSchedule, 
  validateUpdateCollectionSchedule, 
  parseCollectionScheduleId 
} from "@/utils/collectionSchedule/collectionScheduleUtil.js";

/**
 * Get all collection schedules
 * @param c - Hono Context
 * @returns JSON response with array of collection schedule records
 */
export async function getCollectionSchedulesController(c: Context) {
  const collectionSchedulesList = await getCollectionSchedules();
  return c.json(collectionSchedulesList);
}

/**
 * Get a specific collection schedule by ID
 * @param c - Hono Context containing collection schedule ID in params
 * @returns JSON response with collection schedule data
 * @throws NotFoundError if collection schedule doesn't exist
 */
export async function getCollectionScheduleController(c: Context) {
  const id = parseCollectionScheduleId(c.req.param('id'));
  const collectionScheduleData = await getCollectionScheduleById(id);
  return c.json(collectionScheduleData);
}

/**
 * Create a new collection schedule record
 * @param c - Hono Context containing collection schedule data in request body
 * @returns JSON response with created collection schedule data
 * @throws ValidationError if request data is invalid
 */
export async function createCollectionScheduleController(c: Context) {
  const body = await c.req.json();
  const validatedData = validateCreateCollectionSchedule(body);
  const createdCollectionSchedule = await createCollectionSchedule(validatedData);
  return c.json(createdCollectionSchedule, StatusCodes.CREATED);
}

/**
 * Update an existing collection schedule's information
 * @param c - Hono Context containing collection schedule ID and update data
 * @returns JSON response with updated collection schedule data
 * @throws NotFoundError if collection schedule doesn't exist
 * @throws ValidationError if update data is invalid
 */
export async function updateCollectionScheduleController(c: Context) {
  const id = parseCollectionScheduleId(c.req.param('id'));
  const body = await c.req.json();
  const validatedData = validateUpdateCollectionSchedule(body);
  const updatedCollectionSchedule = await updateCollectionSchedule(id, validatedData);
  return c.json(updatedCollectionSchedule);
}

/**
 * Delete a collection schedule
 * @param c - Hono Context containing the collection schedule ID to delete
 * @returns JSON response with deleted collection schedule data
 * @throws NotFoundError if collection schedule doesn't exist
 */
export async function deleteCollectionScheduleController(c: Context) {
  const id = parseCollectionScheduleId(c.req.param('id'));
  const deletedCollectionSchedule = await deleteCollectionSchedule(id);
  return c.json(deletedCollectionSchedule);
}
