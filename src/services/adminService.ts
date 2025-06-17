import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/db/dbConfig';
import { admin, users } from '@/db/schema';
import { assertFound, throwBadRequest } from '@/middlewares/error-handler';

export type PrivilegeLevel = 'superadmin' | 'moderator' | 'staff';

export type CreateAdminInput = {
  userId: number;
  privilegeLevel: PrivilegeLevel;
};

export type UpdateAdminInput = Partial<CreateAdminInput>;

export async function createAdmin(data: CreateAdminInput) {
  // First check if user exists and is not deleted
  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, data.userId), isNull(users.deletedAt)));

  assertFound(user[0], 'User', data.userId);

  // Check if admin record already exists for this user
  const existingAdmin = await db
    .select()
    .from(admin)
    .where(and(eq(admin.userId, data.userId), isNull(admin.deletedAt)));

  if (existingAdmin[0]) {
    throwBadRequest('Admin record already exists for this user');
  }

  const [newAdmin] = await db.insert(admin).values(data).returning();
  return newAdmin;
}

export async function getAdmins() {
  return await db
    .select({
      id: admin.id,
      userId: admin.userId,
      privilegeLevel: admin.privilegeLevel,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
      deletedAt: admin.deletedAt,
      user: {
        id: users.id,
        username: users.username,
        email: users.email,
        firstName: users.firstName,
        middleName: users.middleName,
        lastName: users.lastName,
        usertype: users.usertype,
      },
    })
    .from(admin)
    .leftJoin(users, eq(admin.userId, users.id))
    .where(and(isNull(admin.deletedAt), isNull(users.deletedAt)));
}

export async function getAdminById(id: number) {
  const result = await db
    .select({
      id: admin.id,
      userId: admin.userId,
      privilegeLevel: admin.privilegeLevel,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
      deletedAt: admin.deletedAt,
      user: {
        id: users.id,
        username: users.username,
        email: users.email,
        firstName: users.firstName,
        middleName: users.middleName,
        lastName: users.lastName,
        usertype: users.usertype,
      },
    })
    .from(admin)
    .leftJoin(users, eq(admin.userId, users.id))
    .where(
      and(eq(admin.id, id), isNull(admin.deletedAt), isNull(users.deletedAt))
    );

  const adminRecord = result[0];
  assertFound(adminRecord, 'Admin', id);

  return adminRecord;
}

export async function getAdminByUserId(userId: number) {
  const result = await db
    .select({
      id: admin.id,
      userId: admin.userId,
      privilegeLevel: admin.privilegeLevel,
      createdAt: admin.createdAt,
      updatedAt: admin.updatedAt,
      deletedAt: admin.deletedAt,
      user: {
        id: users.id,
        username: users.username,
        email: users.email,
        firstName: users.firstName,
        middleName: users.middleName,
        lastName: users.lastName,
        usertype: users.usertype,
      },
    })
    .from(admin)
    .leftJoin(users, eq(admin.userId, users.id))
    .where(
      and(
        eq(admin.userId, userId),
        isNull(admin.deletedAt),
        isNull(users.deletedAt)
      )
    );

  const adminRecord = result[0];
  assertFound(adminRecord, 'Admin', `user ID ${userId}`);

  return adminRecord;
}

export async function updateAdmin(id: number, data: UpdateAdminInput) {
  // First check if admin exists and is not deleted
  const existingAdmin = await getAdminById(id);

  // If updating userId, check if the new user exists and doesn't already have an admin record
  if (data.userId && data.userId !== existingAdmin.userId) {
    const user = await db
      .select()
      .from(users)
      .where(and(eq(users.id, data.userId), isNull(users.deletedAt)));

    assertFound(user[0], 'User', data.userId);

    const existingAdminForUser = await db
      .select()
      .from(admin)
      .where(and(eq(admin.userId, data.userId), isNull(admin.deletedAt)));

    if (existingAdminForUser[0]) {
      throwBadRequest('Admin record already exists for this user');
    }
  }

  const [updatedAdmin] = await db
    .update(admin)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(admin.id, id))
    .returning();

  return updatedAdmin;
}

export async function deleteAdmin(id: number) {
  // Check if admin exists and is not already deleted
  await getAdminById(id);

  const [deletedAdmin] = await db
    .update(admin)
    .set({
      deletedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(admin.id, id))
    .returning();

  return deletedAdmin;
}
