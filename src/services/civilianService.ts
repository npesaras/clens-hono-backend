import { and, desc, eq, isNull } from 'drizzle-orm';

import { db } from '@/db/dbConfig';
import {
  address,
  barangay,
  city,
  civilian,
  province,
  users,
} from '@/db/schema';
import { assertFound, throwBadRequest } from '@/middlewares/error-handler';

export type CreateCivilianInput = {
  userId: number;
  addressId: number;
  level: number;
  exp: number;
  streak: number;
  leaderboardRank?: number;
  totalVolumeDisposed: number;
  points: number;
};

export type UpdateCivilianInput = Partial<CreateCivilianInput>;

export async function createCivilian(data: CreateCivilianInput) {
  // First check if user exists and is not deleted
  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, data.userId), isNull(users.deletedAt)));
  assertFound(user[0], 'User', data.userId);

  // Check if address exists and is not deleted
  const addressRecord = await db
    .select()
    .from(address)
    .where(and(eq(address.id, data.addressId), isNull(address.deletedAt)));

  assertFound(addressRecord[0], 'Address', data.addressId);

  // Check if civilian record already exists for this user
  const existingCivilian = await db
    .select()
    .from(civilian)
    .where(and(eq(civilian.userId, data.userId), isNull(civilian.deletedAt)));
  if (existingCivilian[0]) {
    throwBadRequest('Civilian record already exists for this user');
  }

  const [newCivilian] = await db.insert(civilian).values(data).returning();
  return newCivilian;
}

export async function getCivilians() {
  return await db
    .select({
      id: civilian.id,
      userId: civilian.userId,
      addressId: civilian.addressId,
      level: civilian.level,
      exp: civilian.exp,
      streak: civilian.streak,
      leaderboardRank: civilian.leaderboardRank,
      totalVolumeDisposed: civilian.totalVolumeDisposed,
      points: civilian.points,
      createdAt: civilian.createdAt,
      updatedAt: civilian.updatedAt,
      deletedAt: civilian.deletedAt,
      user: {
        id: users.id,
        username: users.username,
        email: users.email,
        firstName: users.firstName,
        middleName: users.middleName,
        lastName: users.lastName,
        usertype: users.usertype,
      },
      address: {
        id: address.id,
        street: address.street,
        provinceId: address.provinceId,
        provinceName: province.name,
        cityId: address.cityId,
        cityName: city.name,
        barangayId: address.barangayId,
        barangayName: barangay.name,
      },
    })
    .from(civilian)
    .leftJoin(users, eq(civilian.userId, users.id))
    .leftJoin(address, eq(civilian.addressId, address.id))
    .leftJoin(province, eq(address.provinceId, province.id))
    .leftJoin(city, eq(address.cityId, city.id))
    .leftJoin(barangay, eq(address.barangayId, barangay.id))
    .where(
      and(
        isNull(civilian.deletedAt),
        isNull(users.deletedAt),
        isNull(address.deletedAt)
      )
    );
}

export async function getCivilianById(id: number) {
  const result = await db
    .select({
      id: civilian.id,
      userId: civilian.userId,
      addressId: civilian.addressId,
      level: civilian.level,
      exp: civilian.exp,
      streak: civilian.streak,
      leaderboardRank: civilian.leaderboardRank,
      totalVolumeDisposed: civilian.totalVolumeDisposed,
      points: civilian.points,
      createdAt: civilian.createdAt,
      updatedAt: civilian.updatedAt,
      deletedAt: civilian.deletedAt,
      user: {
        id: users.id,
        username: users.username,
        email: users.email,
        firstName: users.firstName,
        middleName: users.middleName,
        lastName: users.lastName,
        usertype: users.usertype,
      },
      address: {
        id: address.id,
        street: address.street,
        provinceId: address.provinceId,
        provinceName: province.name,
        cityId: address.cityId,
        cityName: city.name,
        barangayId: address.barangayId,
        barangayName: barangay.name,
      },
    })
    .from(civilian)
    .leftJoin(users, eq(civilian.userId, users.id))
    .leftJoin(address, eq(civilian.addressId, address.id))
    .leftJoin(province, eq(address.provinceId, province.id))
    .leftJoin(city, eq(address.cityId, city.id))
    .leftJoin(barangay, eq(address.barangayId, barangay.id))
    .where(
      and(
        eq(civilian.id, id),
        isNull(civilian.deletedAt),
        isNull(users.deletedAt),
        isNull(address.deletedAt)
      )
    );

  const civilianRecord = result[0];
  assertFound(civilianRecord, 'Civilian record', id);

  return civilianRecord;
}

export async function getCivilianByUserId(userId: number) {
  const result = await db
    .select({
      id: civilian.id,
      userId: civilian.userId,
      addressId: civilian.addressId,
      level: civilian.level,
      exp: civilian.exp,
      streak: civilian.streak,
      leaderboardRank: civilian.leaderboardRank,
      totalVolumeDisposed: civilian.totalVolumeDisposed,
      points: civilian.points,
      createdAt: civilian.createdAt,
      updatedAt: civilian.updatedAt,
      deletedAt: civilian.deletedAt,
      user: {
        id: users.id,
        username: users.username,
        email: users.email,
        firstName: users.firstName,
        middleName: users.middleName,
        lastName: users.lastName,
        usertype: users.usertype,
      },
      address: {
        id: address.id,
        street: address.street,
        provinceId: address.provinceId,
        provinceName: province.name,
        cityId: address.cityId,
        cityName: city.name,
        barangayId: address.barangayId,
        barangayName: barangay.name,
      },
    })
    .from(civilian)
    .leftJoin(users, eq(civilian.userId, users.id))
    .leftJoin(address, eq(civilian.addressId, address.id))
    .leftJoin(province, eq(address.provinceId, province.id))
    .leftJoin(city, eq(address.cityId, city.id))
    .leftJoin(barangay, eq(address.barangayId, barangay.id))
    .where(
      and(
        eq(civilian.userId, userId),
        isNull(civilian.deletedAt),
        isNull(users.deletedAt),
        isNull(address.deletedAt)
      )
    );

  const civilianRecord = result[0];
  assertFound(civilianRecord, 'Civilian record', `user ID ${userId}`);

  return civilianRecord;
}

export async function updateCivilian(id: number, data: UpdateCivilianInput) {
  // First check if civilian exists and is not deleted
  const existingCivilian = await getCivilianById(id);

  assertFound(existingCivilian, 'Existing civilian', id);

  // If updating userId, check if the new user exists and doesn't already have a civilian record
  if (data.userId && data.userId !== existingCivilian.userId) {
    const user = await db
      .select()
      .from(users)
      .where(and(eq(users.id, data.userId), isNull(users.deletedAt)));

    assertFound(user[0], 'User', data.userId);

    const existingCivilianForUser = await db
      .select()
      .from(civilian)
      .where(and(eq(civilian.userId, data.userId), isNull(civilian.deletedAt)));

    if (existingCivilianForUser[0]) {
      throwBadRequest('Civilian record already exists for this user');
    }
  }

  // If updating addressId, check if the address exists
  if (data.addressId && data.addressId !== existingCivilian.addressId) {
    const addressRecord = await db
      .select()
      .from(address)
      .where(and(eq(address.id, data.addressId), isNull(address.deletedAt)));

    assertFound(addressRecord[0], 'Address', data.addressId);
  }

  const [updatedCivilian] = await db
    .update(civilian)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(civilian.id, id))
    .returning();

  return updatedCivilian;
}

export async function deleteCivilian(id: number) {
  // Check if civilian exists and is not already deleted
  const existingCivilian = await getCivilianById(id);

  assertFound(existingCivilian, 'Existing civilian', id);

  const [deletedCivilian] = await db
    .update(civilian)
    .set({
      deletedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(civilian.id, id))
    .returning();

  return deletedCivilian;
}

export async function getCivilianLeaderboard(limit = 10) {
  return await db
    .select({
      id: civilian.id,
      userId: civilian.userId,
      level: civilian.level,
      exp: civilian.exp,
      streak: civilian.streak,
      leaderboardRank: civilian.leaderboardRank,
      totalVolumeDisposed: civilian.totalVolumeDisposed,
      points: civilian.points,
      user: {
        id: users.id,
        username: users.username,
        firstName: users.firstName,
        lastName: users.lastName,
      },
    })
    .from(civilian)
    .leftJoin(users, eq(civilian.userId, users.id))
    .where(and(isNull(civilian.deletedAt), isNull(users.deletedAt)))
    .orderBy(desc(civilian.points))
    .limit(limit);
}
