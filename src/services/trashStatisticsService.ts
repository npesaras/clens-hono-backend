import { eq, isNull, and } from 'drizzle-orm';
import { db } from '@/db/dbConfig';
import { trashStatistics } from '@/db/schema';
import { NotFoundError } from '@/utils/error';

export type CreateTrashStatisticsInput = {
  type: 'civilian' | 'barangay';
  entityId: number;
  leaderboardRank: number;
  totalDisposed: number;
};

export type UpdateTrashStatisticsInput = Partial<CreateTrashStatisticsInput>;

export async function createTrashStatistics(data: CreateTrashStatisticsInput) {
  const [newTrashStatistics] = await db.insert(trashStatistics).values(data).returning();
  return newTrashStatistics;
}

export async function getTrashStatistics() {
  return await db
    .select()
    .from(trashStatistics)
    .where(isNull(trashStatistics.deletedAt));
}

export async function getTrashStatisticsById(id: number) {
  const result = await db
    .select()
    .from(trashStatistics)
    .where(and(
      eq(trashStatistics.id, id),
      isNull(trashStatistics.deletedAt)
    ));
  
  const foundTrashStatistics = result[0];
  if (!foundTrashStatistics) {
    throw new NotFoundError('Trash statistics not found');
  }
  
  return foundTrashStatistics;
}

export async function updateTrashStatistics(id: number, data: UpdateTrashStatisticsInput) {
  const [updatedTrashStatistics] = await db
    .update(trashStatistics)
    .set({ ...data, updatedAt: new Date() })
    .where(and(
      eq(trashStatistics.id, id),
      isNull(trashStatistics.deletedAt)
    ))
    .returning();
  
  if (!updatedTrashStatistics) {
    throw new NotFoundError('Trash statistics not found');
  }
  
  return updatedTrashStatistics;
}

export async function deleteTrashStatistics(id: number) {
  const [deletedTrashStatistics] = await db
    .update(trashStatistics)
    .set({ deletedAt: new Date() })
    .where(and(
      eq(trashStatistics.id, id),
      isNull(trashStatistics.deletedAt)
    ))
    .returning();
  
  if (!deletedTrashStatistics) {
    throw new NotFoundError('Trash statistics not found');
  }
  
  return deletedTrashStatistics;
}
