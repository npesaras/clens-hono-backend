import { eq, isNull, and } from 'drizzle-orm';

import { db } from '@/db/dbConfig';
import { rewardMultipliers } from '@/db/schema';
import { assertFound } from '@/middlewares/error-handler';

export type CreateRewardMultipliersInput = {
  barangayId: number;
  interval: 'day' | 'week' | 'month' | 'year';
  startDate: string;
  endDate: string;
  multiplierExp: number;
  multiplierPoints: number;
};

export type UpdateRewardMultipliersInput =
  Partial<CreateRewardMultipliersInput>;

export async function createRewardMultipliers(
  data: CreateRewardMultipliersInput
) {
  const [newRewardMultipliers] = await db
    .insert(rewardMultipliers)
    .values(data)
    .returning();
  return newRewardMultipliers;
}

export async function getRewardMultipliers() {
  return await db.select().from(rewardMultipliers);
}

export async function getRewardMultipliersById(id: number) {
  const result = await db
    .select()
    .from(rewardMultipliers)
    .where(eq(rewardMultipliers.id, id));

  const foundRewardMultipliers = result[0];
  assertFound(foundRewardMultipliers, ' reward multipliers', id);

  return foundRewardMultipliers;
}

export async function updateRewardMultipliers(
  id: number,
  data: UpdateRewardMultipliersInput
) {
  const [updatedRewardMultipliers] = await db
    .update(rewardMultipliers)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(rewardMultipliers.id, id))
    .returning();

  assertFound(updatedRewardMultipliers, ' reward multipliers', id);

  return updatedRewardMultipliers;
}

export async function deleteRewardMultipliers(id: number) {
  const [deletedRewardMultipliers] = await db
    .delete(rewardMultipliers)
    .where(eq(rewardMultipliers.id, id))
    .returning();

  assertFound(deletedRewardMultipliers, ' reward multipliers', id);

  return deletedRewardMultipliers;
}
