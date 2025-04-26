import { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '@/services/userService';
import { validateCreateUser, validateUpdateUser, parseUserId } from '@/utils/users/userUtil';

/**
 * Get all active users (non-deleted users)
 * @param c - Hono Context
 * @returns JSON response with array of users
 */
export async function getUsersController(c: Context) {
  const users = await getUsers();
  return c.json(users);
}

/**
 * Get a specific user by their ID
 * @param c - Hono Context containing the user ID parameter
 * @returns JSON response with user data if found
 * @throws NotFoundError if user doesn't exist or is deleted
 */
export async function getUserController(c: Context) {
  const id = parseUserId(c.req.param('id'));
  const user = await getUserById(id);
  return c.json(user);
}

/**
 * Create a new user
 * @param c - Hono Context containing the user data in request body
 * @returns JSON response with created user data and 201 status
 * @throws ValidationError if request body is invalid
 */
export async function createUserController(c: Context) {
  const body = await c.req.json();
  const validatedData = validateCreateUser(body);
  const createdUser = await createUser(validatedData);
  return c.json(createdUser, StatusCodes.CREATED);
}

/**
 * Update an existing user's information
 * @param c - Hono Context containing user ID and update data
 * @returns JSON response with updated user data
 * @throws NotFoundError if user doesn't exist or is deleted
 * @throws ValidationError if update data is invalid
 */
export async function updateUserController(c: Context) {
  const id = parseUserId(c.req.param('id'));
  const body = await c.req.json();
  const validatedData = validateUpdateUser(body);
  const updatedUser = await updateUser(id, validatedData);
  return c.json(updatedUser);
}

/**
 * Soft delete a user (marks as deleted but keeps in database)
 * @param c - Hono Context containing the user ID to delete
 * @returns JSON response with deleted user data
 * @throws NotFoundError if user doesn't exist or is already deleted
 */
export async function deleteUserController(c: Context) {
  const id = parseUserId(c.req.param('id'));
  const deletedUser = await deleteUser(id);
  return c.json(deletedUser);
}