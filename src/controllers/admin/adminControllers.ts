/**
 * Admin Controllers
 * This module contains all admin-related request handlers
 */

import type { Context } from 'hono';

import {
  createAdmin,
  deleteAdmin,
  getAdminById,
  getAdminByUserId,
  getAdmins,
  updateAdmin,
} from '@/services/adminService.js';
import {
  parseAdminId,
  validateCreateAdmin,
  validateUpdateAdmin,
} from '@/utils/admin/adminUtil.js';

/**
 * Get all admins with their associated user information
 * @param c - Hono Context
 * @returns JSON response with array of admin records
 */
export async function getAdminsController(c: Context) {
  const admins = await getAdmins();
  return c.json(admins);
}

/**
 * Get a specific admin by ID with associated user information
 * @param c - Hono Context containing admin ID in params
 * @returns JSON response with admin data
 * @throws NotFoundError if admin doesn't exist or is deleted
 */
export async function getAdminController(c: Context) {
  const adminId = parseAdminId(c.req.param('id'));
  const admin = await getAdminById(adminId);
  return c.json(admin);
}

/**
 * Get admin record by user ID
 * @param c - Hono Context containing user ID in params
 * @returns JSON response with admin data
 * @throws NotFoundError if admin doesn't exist for the user
 */
export async function getAdminByUserController(c: Context) {
  const userId = parseAdminId(c.req.param('userId'));
  const admin = await getAdminByUserId(userId);
  return c.json(admin);
}

/**
 * Create a new admin record
 * @param c - Hono Context containing admin data in request body
 * @returns JSON response with created admin data
 * @throws ValidationError if request data is invalid
 * @throws NotFoundError if referenced user doesn't exist
 */
export async function createAdminController(c: Context) {
  const body = await c.req.json();
  const validatedData = validateCreateAdmin(body);
  const admin = await createAdmin(validatedData);
  return c.json(admin, 201);
}

/**
 * Update an existing admin's information
 * @param c - Hono Context containing admin ID and update data
 * @returns JSON response with updated admin data
 * @throws NotFoundError if admin doesn't exist or is deleted
 * @throws ValidationError if update data is invalid
 */
export async function updateAdminController(c: Context) {
  const adminId = parseAdminId(c.req.param('id'));
  const body = await c.req.json();
  const validatedData = validateUpdateAdmin(body);
  const admin = await updateAdmin(adminId, validatedData);
  return c.json(admin);
}

/**
 * Soft delete an admin (marks as deleted but keeps in database)
 * @param c - Hono Context containing the admin ID to delete
 * @returns JSON response with deleted admin data
 * @throws NotFoundError if admin doesn't exist or is already deleted
 */
export async function deleteAdminController(c: Context) {
  const adminId = parseAdminId(c.req.param('id'));
  const admin = await deleteAdmin(adminId);
  return c.json(admin);
}
