import { eq } from 'drizzle-orm';
import { db } from '@/db/dbConfig';
import { collectionSchedule } from '@/db/schema';
import { NotFoundError } from '@/utils/error';

export type CreateCollectionScheduleInput = {
  barangayId: number;
  collectionDate: string;
  collectionTime: string;
};

export type UpdateCollectionScheduleInput = Partial<CreateCollectionScheduleInput>;

export async function createCollectionSchedule(data: CreateCollectionScheduleInput) {
  const [newCollectionSchedule] = await db.insert(collectionSchedule).values(data).returning();
  return newCollectionSchedule;
}

export async function getCollectionSchedules() {
  return await db
    .select()
    .from(collectionSchedule);
}

export async function getCollectionScheduleById(id: number) {
  const result = await db
    .select()
    .from(collectionSchedule)
    .where(eq(collectionSchedule.id, id));
  
  const foundCollectionSchedule = result[0];
  if (!foundCollectionSchedule) {
    throw new NotFoundError('Collection schedule not found');
  }
  
  return foundCollectionSchedule;
}

export async function updateCollectionSchedule(id: number, data: UpdateCollectionScheduleInput) {
  const [updatedCollectionSchedule] = await db
    .update(collectionSchedule)
    .set(data)
    .where(eq(collectionSchedule.id, id))
    .returning();
  
  if (!updatedCollectionSchedule) {
    throw new NotFoundError('Collection schedule not found');
  }
  
  return updatedCollectionSchedule;
}

export async function deleteCollectionSchedule(id: number) {
  const [deletedCollectionSchedule] = await db
    .delete(collectionSchedule)
    .where(eq(collectionSchedule.id, id))
    .returning();
  
  if (!deletedCollectionSchedule) {
    throw new NotFoundError('Collection schedule not found');
  }
  
  return deletedCollectionSchedule;
}
