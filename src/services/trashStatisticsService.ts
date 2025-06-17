import { eq, isNull, and } from 'drizzle-orm';

import { db } from '@/db/dbConfig';
import { trashStatistics } from '@/db/schema';
import { assertFound } from '@/middlewares/error-handler';

export type CreateTrashStatisticsInput = {
  type: 'civilian' | 'barangay';
  entityId: number;
  leaderboardRank: number;
  totalDisposed: number;
};

export type UpdateTrashStatisticsInput = Partial<CreateTrashStatisticsInput>;

export async function createTrashStatistics(data: CreateTrashStatisticsInput) {
  const [newTrashStatistics] = await db
    .insert(trashStatistics)
    .values(data)
    .returning();
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
    .where(and(eq(trashStatistics.id, id), isNull(trashStatistics.deletedAt)));

  const foundTrashStatistics = result[0];
  assertFound(foundTrashStatistics, ' trash statistics', id);

  return foundTrashStatistics;
}

export async function updateTrashStatistics(
  id: number,
  data: UpdateTrashStatisticsInput
) {
  const [updatedTrashStatistics] = await db
    .update(trashStatistics)
    .set({ ...data, updatedAt: new Date() })
    .where(and(eq(trashStatistics.id, id), isNull(trashStatistics.deletedAt)))
    .returning();

  assertFound(updatedTrashStatistics, ' trash statistics', id);

  return updatedTrashStatistics;
}

export async function deleteTrashStatistics(id: number) {
  const [deletedTrashStatistics] = await db
    .update(trashStatistics)
    .set({ deletedAt: new Date() })
    .where(and(eq(trashStatistics.id, id), isNull(trashStatistics.deletedAt)))
    .returning();

  assertFound(deletedTrashStatistics, ' trash statistics', id);

  return deletedTrashStatistics;
}
