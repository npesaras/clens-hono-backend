import { and, eq } from 'drizzle-orm';

import { db } from '@/db/dbConfig';
import { waterQualityStatistics } from '@/db/schema';
import { assertFound } from '@/middlewares/error-handler';

export type CreateWaterQualityStatisticsInput = {
  interval: 'day' | 'week' | 'month' | 'year';
  startDate: string;
  sensorId: number;
  avePh: number;
  aveTds: number;
  aveDissolvedOxygen: number;
  aveTurbidity: number;
  aveOrp: number;
  aveElectricalConductivity: number;
};

export type UpdateWaterQualityStatisticsInput = Partial<
  Omit<CreateWaterQualityStatisticsInput, 'interval' | 'startDate'>
>;

export async function createWaterQualityStatistics(
  data: CreateWaterQualityStatisticsInput
) {
  const [newWaterQualityStatistics] = await db
    .insert(waterQualityStatistics)
    .values(data)
    .returning();
  return newWaterQualityStatistics;
}

export async function getWaterQualityStatistics() {
  return await db.select().from(waterQualityStatistics);
}

export async function getWaterQualityStatisticsById(
  interval: 'day' | 'week' | 'month' | 'year',
  startDate: string
) {
  const result = await db
    .select()
    .from(waterQualityStatistics)
    .where(
      and(
        eq(waterQualityStatistics.interval, interval),
        eq(waterQualityStatistics.startDate, startDate)
      )
    );

  const foundWaterQualityStatistics = result[0];
  assertFound(
    foundWaterQualityStatistics,
    'Water quality statistics',
    `${interval}/${startDate}`
  );

  return foundWaterQualityStatistics;
}

export async function updateWaterQualityStatistics(
  interval: 'day' | 'week' | 'month' | 'year',
  startDate: string,
  data: UpdateWaterQualityStatisticsInput
) {
  const [updatedWaterQualityStatistics] = await db
    .update(waterQualityStatistics)
    .set({ ...data, updatedAt: new Date() })
    .where(
      and(
        eq(waterQualityStatistics.interval, interval),
        eq(waterQualityStatistics.startDate, startDate)
      )
    )
    .returning();

  assertFound(
    updatedWaterQualityStatistics,
    'Water quality statistics',
    `${interval}/${startDate}`
  );

  return updatedWaterQualityStatistics;
}

export async function deleteWaterQualityStatistics(
  interval: 'day' | 'week' | 'month' | 'year',
  startDate: string
) {
  const [deletedWaterQualityStatistics] = await db
    .delete(waterQualityStatistics)
    .where(
      and(
        eq(waterQualityStatistics.interval, interval),
        eq(waterQualityStatistics.startDate, startDate)
      )
    )
    .returning();

  assertFound(
    deletedWaterQualityStatistics,
    'Water quality statistics',
    `${interval}/${startDate}`
  );

  return deletedWaterQualityStatistics;
}
