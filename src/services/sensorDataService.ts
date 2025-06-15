import { and, eq, isNull } from 'drizzle-orm';

import { db } from '@/db/dbConfig';
import { sensorData } from '@/db/schema';
import { assertFound } from '@/middlewares/error-handler';

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
  assertFound(foundSensorData, 'Sensor data', id);

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

  assertFound(updatedSensorData, 'Sensor data', id);

  return updatedSensorData;
}

export async function deleteSensorData(id: number) {
  const [deletedSensorData] = await db
    .update(sensorData)
    .set({ deletedAt: new Date() })
    .where(and(eq(sensorData.id, id), isNull(sensorData.deletedAt)))
    .returning();

  assertFound(deletedSensorData, 'Sensor data', id);

  return deletedSensorData;
}
