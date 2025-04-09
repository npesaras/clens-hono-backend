import { eq } from 'drizzle-orm';
import { db } from '@/db/dbConfig';
import { users } from '@/db/schema';
import { NotFoundError } from '@/utils/error';

export type CreateUserInput = {
  name: string;
  email: string;
};

export type UpdateUserInput = Partial<CreateUserInput>;

export async function createUser(data: CreateUserInput) {
  const [user] = await db.insert(users).values(data).returning();
  return user;
}

export async function getUsers() {
  return await db.select().from(users);
}

export async function getUserById(id: number) {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  
  if (!user) {
    throw new NotFoundError('User not found');
  }
  
  return user;
}

export async function updateUser(id: number, data: UpdateUserInput) {
  const [updatedUser] = await db
    .update(users)
    .set(data)
    .where(eq(users.id, id))
    .returning();
    
  if (!updatedUser) {
    throw new NotFoundError('User not found');
  }
  
  return updatedUser;
}

export async function deleteUser(id: number) {
  const [deletedUser] = await db
    .delete(users)
    .where(eq(users.id, id))
    .returning();
    
  if (!deletedUser) {
    throw new NotFoundError('User not found');
  }
  
  return deletedUser;
}