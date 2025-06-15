import { eq, isNull, and } from 'drizzle-orm';
import { db } from '@/db/dbConfig';
import { trashRecord } from '@/db/schema';
import { NotFoundError } from '@/utils/error';

export type CreateTrashRecordInput = {
  civilianId: number;
  volume: number;
  segregationScore: number;
  recyclingScore: number;
  wasteType: 'organic' | 'recyclable' | 'hazardous' | 'non-recyclable';
  collected: boolean;
  dateDisposed: string;
  dateCollected?: string;
  collectorId?: number;
};

export type UpdateTrashRecordInput = Partial<CreateTrashRecordInput>;

export async function createTrashRecord(data: CreateTrashRecordInput) {
  const [newTrashRecord] = await db.insert(trashRecord).values({
    ...data,
    dateDisposed: new Date(data.dateDisposed),
    dateCollected: data.dateCollected ? new Date(data.dateCollected) : undefined
  }).returning();
  return newTrashRecord;
}

export async function getTrashRecords() {
  return await db
    .select()
    .from(trashRecord)
    .where(isNull(trashRecord.deletedAt));
}

export async function getTrashRecordById(id: number) {
  const result = await db
    .select()
    .from(trashRecord)
    .where(and(
      eq(trashRecord.id, id),
      isNull(trashRecord.deletedAt)
    ));
  
  const foundTrashRecord = result[0];
  if (!foundTrashRecord) {
    throw new NotFoundError('Trash record not found');
  }
  
  return foundTrashRecord;
}

export async function updateTrashRecord(id: number, data: UpdateTrashRecordInput) {
  const updateData: any = { ...data, updatedAt: new Date() };
  if (data.dateDisposed) updateData.dateDisposed = new Date(data.dateDisposed);
  if (data.dateCollected) updateData.dateCollected = new Date(data.dateCollected);
  
  const [updatedTrashRecord] = await db
    .update(trashRecord)
    .set(updateData)
    .where(and(
      eq(trashRecord.id, id),
      isNull(trashRecord.deletedAt)
    ))
    .returning();
  
  if (!updatedTrashRecord) {
    throw new NotFoundError('Trash record not found');
  }
  
  return updatedTrashRecord;
}

export async function deleteTrashRecord(id: number) {
  const [deletedTrashRecord] = await db
    .update(trashRecord)
    .set({ deletedAt: new Date() })
    .where(and(
      eq(trashRecord.id, id),
      isNull(trashRecord.deletedAt)
    ))
    .returning();
  
  if (!deletedTrashRecord) {
    throw new NotFoundError('Trash record not found');
  }
  
  return deletedTrashRecord;
}
