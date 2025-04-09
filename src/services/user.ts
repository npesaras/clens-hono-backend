import { eq, isNull, and } from 'drizzle-orm';
import { db } from '../db/dbConfig.js';
import { users } from '../db/schema.js';
import { NotFoundError } from '../utils/error.js';
import * as bcrypt from 'bcryptjs';
import { env } from '../utils/env.js';

export type UserType = 'admin' | 'civilian' | 'collector';

export type CreateUserInput = {
  usertype: UserType;
  username: string;
  email: string;
  firstname: string;
  middlename: string;
  lastname: string;
  password: string;
};

export type UpdateUserInput = Partial<Omit<CreateUserInput, 'password'>>;

export async function createUser(data: CreateUserInput) {
  const hashedPassword = await bcrypt.hash(data.password, Number(env.SALT_ROUNDS));
  const [user] = await db.insert(users).values({
    ...data,
    password: hashedPassword
  }).returning();
  return user;
}

export async function getUsers() {
  return await db
    .select()
    .from(users)
    .where(isNull(users.deletedAt));
}

export async function getUserById(id: number) {
  const result = await db
    .select()
    .from(users)
    .where(and(
      eq(users.id, id),
      isNull(users.deletedAt)
    ));
  
  const user = result[0];
  if (!user) {
    throw new NotFoundError('User not found');
  }
  
  return user;
}

export async function updateUser(id: number, data: UpdateUserInput) {
  const result = await db
    .update(users)
    .set({
      ...data,
      updatedAt: new Date()
    })
    .where(and(
      eq(users.id, id),
      isNull(users.deletedAt)
    ))
    .returning();
    
  const updatedUser = result[0];
  if (!updatedUser) {
    throw new NotFoundError('User not found');
  }
  
  return updatedUser;
}

export async function deleteUser(id: number) {
  // Soft delete
  const result = await db
    .update(users)
    .set({
      deletedAt: new Date(),
      updatedAt: new Date()
    })
    .where(and(
      eq(users.id, id),
      isNull(users.deletedAt)
    ))
    .returning();
    
  const deletedUser = result[0];
  if (!deletedUser) {
    throw new NotFoundError('User not found');
  }
  
  return deletedUser;
}