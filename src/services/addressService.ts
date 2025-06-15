import { eq, isNull, and } from 'drizzle-orm';
import { db } from '@/db/dbConfig';
import { address } from '@/db/schema';
import { NotFoundError } from '@/utils/error';

export type CreateAddressInput = {
  street: string;
  barangay: string;
  city: string;
  province: string;
  zipCode: string;
  country?: string;
  latitude?: number;
  longitude?: number;
};

export type UpdateAddressInput = Partial<CreateAddressInput>;

export async function createAddress(data: CreateAddressInput) {
  const [newAddress] = await db.insert(address).values({
    ...data,
    country: data.country || 'Philippines'
  }).returning();
  return newAddress;
}

export async function getAddresses() {
  return await db
    .select()
    .from(address)
    .where(isNull(address.deletedAt));
}

export async function getAddressById(id: number) {
  const result = await db
    .select()
    .from(address)
    .where(and(
      eq(address.id, id),
      isNull(address.deletedAt)
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
