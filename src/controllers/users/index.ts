import { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '@/services/user';
import { validateCreateUser, validateUpdateUser, parseUserId } from '@/utils/users/user';

export async function getUsersController(c: Context) {
  const users = await getUsers();
  return c.json(users);
}

export async function getUserController(c: Context) {
  const id = parseUserId(c.req.param('id'));
  const user = await getUserById(id);
  return c.json(user);
}

export async function createUserController(c: Context) {
  const body = await c.req.json();
  const validatedData = validateCreateUser(body);
  const createdUser = await createUser(validatedData);
  return c.json(createdUser, StatusCodes.CREATED);
}

export async function updateUserController(c: Context) {
  const id = parseUserId(c.req.param('id'));
  const body = await c.req.json();
  const validatedData = validateUpdateUser(body);
  const updatedUser = await updateUser(id, validatedData);
  return c.json(updatedUser);
}

export async function deleteUserController(c: Context) {
  const id = parseUserId(c.req.param('id'));
  const deletedUser = await deleteUser(id);
  return c.json(deletedUser);
}