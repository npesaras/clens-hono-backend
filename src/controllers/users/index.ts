import { Context } from 'hono';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';
import { createUser, deleteUser, getUserById, getUsers, updateUser, UserType } from '@/services/user';

const userTypeEnum = z.enum(['admin', 'civilian', 'collector']); //defined in schema

const createUserSchema = z.object({
  usertype: userTypeEnum,
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email format'),
  firstname: z.string().min(1, 'First name is required'),
  middlename: z.string().min(1, 'Middle name is required'),
  lastname: z.string().min(1, 'Last name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters')
});

const updateUserSchema = z.object({
  usertype: userTypeEnum.optional(),
  username: z.string().min(3, 'Username must be at least 3 characters').optional(),
  email: z.string().email('Invalid email format').optional(),
  firstname: z.string().min(1, 'First name is required').optional(),
  middlename: z.string().min(1, 'Middle name is required').optional(),
  lastname: z.string().min(1, 'Last name is required').optional()
});

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