import { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '@/services/user';

const createUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format')
});

const updateUserSchema = createUserSchema.partial();

export async function getUsersController(c: Context) {
  const users = await getUsers();
  return c.json(users);
}

export async function getUserController(c: Context) {
  const id = Number(c.req.param('id'));
  const user = await getUserById(id);
  return c.json(user);
}

export async function createUserController(c: Context) {
  const body = await c.req.json();
  const validatedData = createUserSchema.parse(body);
  
  const createdUser = await createUser(validatedData);
  return c.json(createdUser, StatusCodes.CREATED);
}

export async function updateUserController(c: Context) {
  const id = Number(c.req.param('id'));
  const body = await c.req.json();
  const validatedData = updateUserSchema.parse(body);
  
  const updatedUser = await updateUser(id, validatedData);
  return c.json(updatedUser);
}

export async function deleteUserController(c: Context) {
  const id = Number(c.req.param('id'));
  const deletedUser = await deleteUser(id);
  return c.json(deletedUser);
}