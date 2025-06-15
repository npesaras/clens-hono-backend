import bcrypt from 'bcryptjs';
import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/db/dbConfig';
import { users } from '@/db/schema';
import { assertFound } from '@/middlewares/error-handler';
import { env } from '@/utils/env';

export type UserType = 'admin' | 'civilian' | 'collector';

export type CreateUserInput = {
  usertype: UserType;
  username: string;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  password: string;
};

export type UpdateUserInput = Partial<Omit<CreateUserInput, 'password'>>;

export async function createUser(data: CreateUserInput) {
  const hashedPassword = await bcrypt.hash(
    data.password,
    Number(env.SALT_ROUNDS)
  );
  const [user] = await db
    .insert(users)
    .values({
      ...data,
      password: hashedPassword,
    })
    .returning();
  return user;
}

export async function getUsers() {
  return await db.select().from(users).where(isNull(users.deletedAt));
}

export async function getUserById(id: number) {
  const result = await db
    .select()
    .from(users)
    .where(and(eq(users.id, id), isNull(users.deletedAt)));

  const user = result[0];
  assertFound(user, 'User', id);
  return user;
}

export async function updateUser(id: number, data: UpdateUserInput) {
  const result = await db
    .update(users)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(and(eq(users.id, id), isNull(users.deletedAt)))
    .returning();

  const updatedUser = result[0];
  assertFound(updatedUser, 'User', id);
  return updatedUser;
}

export async function deleteUser(id: number) {
  // Soft delete
  const result = await db
    .update(users)
    .set({
      deletedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(and(eq(users.id, id), isNull(users.deletedAt)))
    .returning();

  const deletedUser = result[0];
  assertFound(deletedUser, 'User', id);
  return deletedUser;
}
