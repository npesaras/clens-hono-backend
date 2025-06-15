import { eq, isNull, and } from 'drizzle-orm';
import { db } from '@/db/dbConfig';
import { address, province, city, barangay } from '@/db/schema';
import { NotFoundError } from '@/utils/error';

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
    .where(and(
      eq(province.id, data.provinceId),
      isNull(province.deletedAt)
    ));
  
  if (!provinceRecord[0]) {
    throw new NotFoundError('Province not found or has been deleted');
  }

  // Validate that city exists and belongs to the province
  const cityRecord = await db
    .select()
    .from(city)
    .where(and(
      eq(city.id, data.cityId),
      eq(city.provinceId, data.provinceId),
      isNull(city.deletedAt)
    ));
  
  if (!cityRecord[0]) {
    throw new NotFoundError('City not found or does not belong to the specified province');
  }

  // Validate that barangay exists and belongs to the city
  const barangayRecord = await db
    .select()
    .from(barangay)
    .where(and(
      eq(barangay.id, data.barangayId),
      eq(barangay.cityId, data.cityId),
      isNull(barangay.deletedAt)
    ));
  
  if (!barangayRecord[0]) {
    throw new NotFoundError('Barangay not found or does not belong to the specified city');
  }

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
        name: province.name
      },
      city: {
        id: city.id,
        name: city.name
      },
      barangay: {
        id: barangay.id,
        name: barangay.name
      }
    })
    .from(address)
    .leftJoin(province, eq(address.provinceId, province.id))
    .leftJoin(city, eq(address.cityId, city.id))
    .leftJoin(barangay, eq(address.barangayId, barangay.id))
    .where(and(
      isNull(address.deletedAt),
      isNull(province.deletedAt),
      isNull(city.deletedAt),
      isNull(barangay.deletedAt)
    ));
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
        name: province.name
      },
      city: {
        id: city.id,
        name: city.name
      },
      barangay: {
        id: barangay.id,
        name: barangay.name
      }
    })
    .from(address)
    .leftJoin(province, eq(address.provinceId, province.id))
    .leftJoin(city, eq(address.cityId, city.id))
    .leftJoin(barangay, eq(address.barangayId, barangay.id))
    .where(and(
      eq(address.id, id),
      isNull(address.deletedAt),
      isNull(province.deletedAt),
      isNull(city.deletedAt),
      isNull(barangay.deletedAt)
    ));
  
  const addressRecord = result[0];
  if (!addressRecord) {
    throw new NotFoundError('Address not found');
  }
  
  return addressRecord;
}

export async function updateAddress(id: number, data: UpdateAddressInput) {
  // First check if address exists and is not deleted
  const existingAddress = await getAddressById(id);
  
  if (!existingAddress) {
    throw new NotFoundError('Address not found');
  }

  // If updating province, city, or barangay, validate the relationships
  if (data.provinceId || data.cityId || data.barangayId) {
    const provinceId = data.provinceId || existingAddress.provinceId;
    const cityId = data.cityId || existingAddress.cityId;
    const barangayId = data.barangayId || existingAddress.barangayId;

    // Validate province
    const provinceRecord = await db
      .select()
      .from(province)
      .where(and(
        eq(province.id, provinceId),
        isNull(province.deletedAt)
      ));
    
    if (!provinceRecord[0]) {
      throw new NotFoundError('Province not found or has been deleted');
    }

    // Validate city belongs to province
    const cityRecord = await db
      .select()
      .from(city)
      .where(and(
        eq(city.id, cityId),
        eq(city.provinceId, provinceId),
        isNull(city.deletedAt)
      ));
    
    if (!cityRecord[0]) {
      throw new NotFoundError('City not found or does not belong to the specified province');
    }

    // Validate barangay belongs to city
    const barangayRecord = await db
      .select()
      .from(barangay)
      .where(and(
        eq(barangay.id, barangayId),
        eq(barangay.cityId, cityId),
        isNull(barangay.deletedAt)
      ));
    
    if (!barangayRecord[0]) {
      throw new NotFoundError('Barangay not found or does not belong to the specified city');
    }
  }

  const [updatedAddress] = await db
    .update(address)
    .set({
      ...data,
      updatedAt: new Date()
    })
    .where(eq(address.id, id))
    .returning();
  
  return updatedAddress;
}

export async function deleteAddress(id: number) {
  // Check if address exists and is not already deleted
  const existingAddress = await getAddressById(id);
  
  if (!existingAddress) {
    throw new NotFoundError('Address not found');
  }

  const [deletedAddress] = await db
    .update(address)
    .set({
      deletedAt: new Date(),
      updatedAt: new Date()
    })
    .where(eq(address.id, id))
    .returning();
  
  return deletedAddress;
}
