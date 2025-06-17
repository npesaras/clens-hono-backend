import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/db/dbConfig';
import { address, barangay, city, province } from '@/db/schema';
import { assertFound } from '@/middlewares/error-handler';

export type CreateAddressInput = {
  street: string;
  provinceId: number;
  cityId: number;
  barangayId: number;
};

export type UpdateAddressInput = Partial<CreateAddressInput>;

export async function createAddress(data: CreateAddressInput) {
  // Validate that province exists
  const provinceRecord = await db
    .select()
    .from(province)
    .where(eq(province.id, data.provinceId));

  assertFound(provinceRecord[0], 'Province', data.provinceId);

  // Validate that city exists and belongs to the province
  const cityRecord = await db
    .select()
    .from(city)
    .where(and(eq(city.id, data.cityId), eq(city.provinceId, data.provinceId)));

  assertFound(cityRecord[0], 'City', data.cityId);

  // Validate that barangay exists and belongs to the city
  const barangayRecord = await db
    .select()
    .from(barangay)
    .where(
      and(eq(barangay.id, data.barangayId), eq(barangay.cityId, data.cityId))
    );

  assertFound(barangayRecord[0], 'Barangay', data.barangayId);

  const [newAddress] = await db.insert(address).values(data).returning();
  return newAddress;
}

export async function getAddresses() {
  return await db
    .select({
      id: address.id,
      street: address.street,
      provinceId: address.provinceId,
      cityId: address.cityId,
      barangayId: address.barangayId,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt,
      deletedAt: address.deletedAt,
      province: {
        id: province.id,
        name: province.name,
      },
      city: {
        id: city.id,
        name: city.name,
      },
      barangay: {
        id: barangay.id,
        name: barangay.name,
      },
    })
    .from(address)
    .leftJoin(province, eq(address.provinceId, province.id))
    .leftJoin(city, eq(address.cityId, city.id))
    .leftJoin(barangay, eq(address.barangayId, barangay.id))
    .where(and(isNull(address.deletedAt)));
}

export async function getAddressById(id: number) {
  const result = await db
    .select({
      id: address.id,
      street: address.street,
      provinceId: address.provinceId,
      cityId: address.cityId,
      barangayId: address.barangayId,
      createdAt: address.createdAt,
      updatedAt: address.updatedAt,
      deletedAt: address.deletedAt,
      province: {
        id: province.id,
        name: province.name,
      },
      city: {
        id: city.id,
        name: city.name,
      },
      barangay: {
        id: barangay.id,
        name: barangay.name,
      },
    })
    .from(address)
    .leftJoin(province, eq(address.provinceId, province.id))
    .leftJoin(city, eq(address.cityId, city.id))
    .leftJoin(barangay, eq(address.barangayId, barangay.id))
    .where(and(eq(address.id, id), isNull(address.deletedAt)));

  const addressRecord = result[0];
  assertFound(addressRecord, 'Address', id);
  return addressRecord;
}

export async function updateAddress(id: number, data: UpdateAddressInput) {
  // First check if address exists and is not deleted
  const existingAddress = await getAddressById(id);

  // If updating province, city, or barangay, validate the relationships
  if (data.provinceId || data.cityId || data.barangayId) {
    const provinceId = data.provinceId ?? existingAddress.provinceId;
    const cityId = data.cityId ?? existingAddress.cityId;
    const barangayId = data.barangayId ?? existingAddress.barangayId;

    // Validate province
    const provinceRecord = await db
      .select()
      .from(province)
      .where(eq(province.id, provinceId));
    assertFound(provinceRecord[0], 'Province', provinceId);

    // Validate city belongs to province
    const cityRecord = await db
      .select()
      .from(city)
      .where(and(eq(city.id, cityId), eq(city.provinceId, provinceId)));

    assertFound(cityRecord[0], 'City', cityId);

    // Validate barangay belongs to city
    const barangayRecord = await db
      .select()
      .from(barangay)
      .where(and(eq(barangay.id, barangayId), eq(barangay.cityId, cityId)));

    assertFound(barangayRecord[0], 'Barangay', barangayId);
  }

  const [updatedAddress] = await db
    .update(address)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(address.id, id))
    .returning();

  return updatedAddress;
}

export async function deleteAddress(id: number) {
  // Check if address exists and is not already deleted
  await getAddressById(id);

  const [deletedAddress] = await db
    .update(address)
    .set({
      deletedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(address.id, id))
    .returning();

  return deletedAddress;
}
