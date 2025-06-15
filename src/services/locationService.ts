import { eq, isNull, and } from 'drizzle-orm';
import { db } from '@/db/dbConfig';
import { location } from '@/db/schema';
import { NotFoundError } from '@/utils/error';

export type CreateLocationInput = {
  latitude: string;
  longitude: string;
  truckId: number;
};

export type UpdateLocationInput = Partial<CreateLocationInput>;

export async function createLocation(data: CreateLocationInput) {
  const [newLocation] = await db.insert(location).values(data).returning();
  return newLocation;
}

export async function getLocations() {
  return await db
    .select()
    .from(location)
    .where(isNull(location.deletedAt));
}

export async function getLocationById(id: number) {
  const result = await db
    .select()
    .from(location)
    .where(and(
      eq(location.id, id),
      isNull(location.deletedAt)
    ));
  
  const foundLocation = result[0];
  if (!foundLocation) {
    throw new NotFoundError('Location not found');
  }
  
  return foundLocation;
}

export async function updateLocation(id: number, data: UpdateLocationInput) {
  const [updatedLocation] = await db
    .update(location)
    .set({ ...data, updatedAt: new Date() })
    .where(and(
      eq(location.id, id),
      isNull(location.deletedAt)
    ))
    .returning();
  
  if (!updatedLocation) {
    throw new NotFoundError('Location not found');
  }
  
  return updatedLocation;
}

export async function deleteLocation(id: number) {
  const [deletedLocation] = await db
    .update(location)
    .set({ deletedAt: new Date() })
    .where(and(
      eq(location.id, id),
      isNull(location.deletedAt)
    ))
    .returning();
  
  if (!deletedLocation) {
    throw new NotFoundError('Location not found');
  }
  
  return deletedLocation;
}
