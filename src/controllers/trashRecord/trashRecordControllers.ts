import { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { createTrashRecord, deleteTrashRecord, getTrashRecordById, getTrashRecords, updateTrashRecord } from '@/services/trashRecordService';
import { validateCreateTrashRecord, validateUpdateTrashRecord, parseTrashRecordId } from '@/utils/trashRecord/trashRecordUtil';

/**
 * Get all active trash records (non-deleted trash records)
 * @param c - Hono Context
 * @returns JSON response with array of trash records
 */
export async function getTrashRecordsController(c: Context) {
  const trashRecords = await getTrashRecords();
  return c.json(trashRecords);
}

/**
 * Get a specific trash record by their ID
 * @param c - Hono Context containing the trash record ID parameter
 * @returns JSON response with trash record data if found
 * @throws NotFoundError if trash record doesn't exist or is deleted
 */
export async function getTrashRecordController(c: Context) {
  const id = parseTrashRecordId(c.req.param('id'));
  const trashRecordData = await getTrashRecordById(id);
  return c.json(trashRecordData);
}

/**
 * Create a new trash record
 * @param c - Hono Context containing the trash record data in request body
 * @returns JSON response with created trash record data and 201 status
 * @throws ValidationError if request body is invalid
 */
export async function createTrashRecordController(c: Context) {
  const body = await c.req.json();
  const validatedData = validateCreateTrashRecord(body);
  const createdTrashRecord = await createTrashRecord(validatedData);
  return c.json(createdTrashRecord, StatusCodes.CREATED);
}

/**
 * Update an existing trash record's information
 * @param c - Hono Context containing trash record ID and update data
 * @returns JSON response with updated trash record data
 * @throws NotFoundError if trash record doesn't exist or is deleted
 * @throws ValidationError if update data is invalid
 */
export async function updateTrashRecordController(c: Context) {
  const id = parseTrashRecordId(c.req.param('id'));
  const body = await c.req.json();
  const validatedData = validateUpdateTrashRecord(body);
  const updatedTrashRecord = await updateTrashRecord(id, validatedData);
  return c.json(updatedTrashRecord);
}

/**
 * Soft delete a trash record (marks as deleted but keeps in database)
 * @param c - Hono Context containing the trash record ID to delete
 * @returns JSON response with deleted trash record data
 * @throws NotFoundError if trash record doesn't exist or is already deleted
 */
export async function deleteTrashRecordController(c: Context) {
  const id = parseTrashRecordId(c.req.param('id'));
  const deletedTrashRecord = await deleteTrashRecord(id);
  return c.json(deletedTrashRecord);
}
