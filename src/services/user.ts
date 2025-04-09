import { eq } from 'drizzle-orm';
import { db } from '@/db/dbConfig';
import { users } from '@/db/schema';
import { NotFoundError } from '@/utils/error';

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
  // TODO: Hash password before saving
  const [user] = await db.insert(users).values(data).returning();
  return user;
}

export async function getUsers() {
  return await db
    .select()
    .from(users)
    .where(eq(users.deletedAt, null));
}

export async function getUserById(id: number) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .where(eq(users.deletedAt, null));
  
  if (!user) {
    throw new NotFoundError('User not found');
  }
  
  return user;
}

export async function updateUser(id: number, data: UpdateUserInput) {
  const [updatedUser] = await db
    .update(users)
    .set({
      ...data,
      updatedAt: new Date()
    })
    .where(eq(users.id, id))
    .where(eq(users.deletedAt, null))
    .returning();
    
  if (!updatedUser) {
    throw new NotFoundError('User not found');
  }
  
  return updatedUser;
}

export async function deleteUser(id: number) {
  // Soft delete
  const [deletedUser] = await db
    .update(users)
    .set({
      deletedAt: new Date(),
      updatedAt: new Date()
    })
    .where(eq(users.id, id))
    .where(eq(users.deletedAt, null))
    .returning();
    
  if (!deletedUser) {
    throw new NotFoundError('User not found');
  }
  
  return deletedUser;
}