import { eq, isNull, and } from 'drizzle-orm';

import { db } from '@/db/dbConfig';
import { sensorData } from '@/db/schema';
import { NotFoundError } from '@/utils/error';

export type CreateSensorDataInput = {
  sensorId: number;
  ph: number;
  tds: number;
  dissolvedOxygen: number;
  turbidity: number;
  orp: number;
  electricalConductivity: number;
  connectionMode: 'Wifi' | 'lora';
};

export type UpdateSensorDataInput = Partial<CreateSensorDataInput>;

export async function createSensorData(data: CreateSensorDataInput) {
  const [newSensorData] = await db.insert(sensorData).values(data).returning();
  return newSensorData;
}

export async function getSensorData() {
  return await db.select().from(sensorData).where(isNull(sensorData.deletedAt));
}

export async function getSensorDataById(id: number) {
  const result = await db
    .select()
    .from(sensorData)
    .where(and(eq(sensorData.id, id), isNull(sensorData.deletedAt)));

  const foundSensorData = result[0];
  if (!foundSensorData) {
    throw new NotFoundError('Sensor data not found');
  }

  return foundSensorData;
}

export async function updateSensorData(
  id: number,
  data: UpdateSensorDataInput
) {
  const [updatedSensorData] = await db
    .update(sensorData)
    .set(data)
    .where(and(eq(sensorData.id, id), isNull(sensorData.deletedAt)))
    .returning();

  if (!updatedSensorData) {
    throw new NotFoundError('Sensor data not found');
  }

  return updatedSensorData;
}

export async function deleteSensorData(id: number) {
  const [deletedSensorData] = await db
    .update(sensorData)
    .set({ deletedAt: new Date() })
    .where(and(eq(sensorData.id, id), isNull(sensorData.deletedAt)))
    .returning();

  if (!deletedSensorData) {
    throw new NotFoundError('Sensor data not found');
  }

  return deletedSensorData;
}
