/**
 * Admin Controllers
 * This module contains all admin-related request handlers
 */

import type { Context } from 'hono';

import {
  createAdmin,
  getAdmins,
  getAdminById,
  getAdminByUserId,
  updateAdmin,
  deleteAdmin,
} from '@/services/adminService.js';
import {
  validateCreateAdmin,
  validateUpdateAdmin,
  parseAdminId,
} from '@/utils/admin/adminUtil.js';
import { BadRequestError } from '@/utils/error.js';

/**
 * Get all admins with their associated user information
 * @param c - Hono Context
 * @returns JSON response with array of admin records
 */
export async function getAdminsController(c: Context) {
  try {
    const admins = await getAdmins();
    return c.json(admins);
  } catch (error) {
    throw error;
  }
}

/**
 * Get a specific admin by ID with associated user information
 * @param c - Hono Context containing admin ID in params
 * @returns JSON response with admin data
 * @throws NotFoundError if admin doesn't exist or is deleted
 */
export async function getAdminController(c: Context) {
  try {
    const adminId = parseAdminId(c.req.param('id'));
    const admin = await getAdminById(adminId);
    return c.json(admin);
  } catch (error) {
    throw error;
  }
}

/**
 * Get admin record by user ID
 * @param c - Hono Context containing user ID in params
 * @returns JSON response with admin data
 * @throws NotFoundError if admin doesn't exist for the user
 */
export async function getAdminByUserController(c: Context) {
  try {
    const userId = parseAdminId(c.req.param('userId'));
    const admin = await getAdminByUserId(userId);
    return c.json(admin);
  } catch (error) {
    throw error;
  }
}

/**
 * Create a new admin record
 * @param c - Hono Context containing admin data in request body
 * @returns JSON response with created admin data
 * @throws ValidationError if request data is invalid
 * @throws NotFoundError if referenced user doesn't exist
 */
export async function createAdminController(c: Context) {
  try {
    const body = await c.req.json();
    const validatedData = validateCreateAdmin(body);
    const admin = await createAdmin(validatedData);
    return c.json(admin, 201);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new BadRequestError('Invalid JSON in request body');
    }
    throw error;
  }
}

/**
 * Update an existing admin's information
 * @param c - Hono Context containing admin ID and update data
 * @returns JSON response with updated admin data
 * @throws NotFoundError if admin doesn't exist or is deleted
 * @throws ValidationError if update data is invalid
 */
export async function updateAdminController(c: Context) {
  try {
    const adminId = parseAdminId(c.req.param('id'));
    const body = await c.req.json();
    const validatedData = validateUpdateAdmin(body);
    const admin = await updateAdmin(adminId, validatedData);
    return c.json(admin);
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new BadRequestError('Invalid JSON in request body');
    }
    throw error;
  }
}

/**
 * Soft delete an admin (marks as deleted but keeps in database)
 * @param c - Hono Context containing the admin ID to delete
 * @returns JSON response with deleted admin data
 * @throws NotFoundError if admin doesn't exist or is already deleted
 */
export async function deleteAdminController(c: Context) {
  try {
    const adminId = parseAdminId(c.req.param('id'));
    const admin = await deleteAdmin(adminId);
    return c.json(admin);
  } catch (error) {
    throw error;
  }
}
