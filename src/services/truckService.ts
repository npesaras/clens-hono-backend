import { eq, isNull, and } from 'drizzle-orm';

import { db } from '@/db/dbConfig';
import { truck } from '@/db/schema';
import { assertFound } from '@/middlewares/error-handler';

export type CreateTruckInput = {
  plateNumber: string;
  active: boolean;
  userId: number;
  totalCollectedVolume: number;
};

export type UpdateTruckInput = Partial<CreateTruckInput>;

export async function createTruck(data: CreateTruckInput) {
  const [newTruck] = await db.insert(truck).values(data).returning();
  return newTruck;
}

export async function getTrucks() {
  return await db.select().from(truck).where(isNull(truck.deletedAt));
}

export async function getTruckById(id: number) {
  const result = await db
    .select()
    .from(truck)
    .where(and(eq(truck.id, id), isNull(truck.deletedAt)));

  const foundTruck = result[0];
  assertFound(foundTruck, ' truck', id);

  return foundTruck;
}

export async function updateTruck(id: number, data: UpdateTruckInput) {
  const [updatedTruck] = await db
    .update(truck)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(truck.id, id), isNull(truck.deletedAt)))
    .returning();

  assertFound(updatedTruck, ' truck', id);

  return updatedTruck;
}

export async function deleteTruck(id: number) {
  const [deletedTruck] = await db
    .update(truck)
    .set({ deletedAt: new Date() })
    .where(and(eq(truck.id, id), isNull(truck.deletedAt)))
    .returning();

  assertFound(deletedTruck, ' truck', id);

  return deletedTruck;
}
