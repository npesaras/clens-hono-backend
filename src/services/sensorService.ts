import { eq } from 'drizzle-orm';

import { db } from '@/db/dbConfig';
import { sensor } from '@/db/schema';
import { assertFound } from '@/middlewares/error-handler';

export type CreateSensorInput = {
  activeStatus: boolean;
  barangayId: number;
  sensorType: 'type1' | 'type2' | 'type3';
};

export type UpdateSensorInput = Partial<CreateSensorInput>;

export async function createSensor(data: CreateSensorInput) {
  const [newSensor] = await db.insert(sensor).values(data).returning();
  return newSensor;
}

export async function getSensors() {
  return await db.select().from(sensor);
}

export async function getSensorById(id: number) {
  const result = await db.select().from(sensor).where(eq(sensor.id, id));

  const foundSensor = result[0];
  assertFound(foundSensor, 'Sensor', id);

  return foundSensor;
}

export async function updateSensor(id: number, data: UpdateSensorInput) {
  const [updatedSensor] = await db
    .update(sensor)
    .set(data)
    .where(eq(sensor.id, id))
    .returning();

  assertFound(updatedSensor, 'Sensor', id);

  return updatedSensor;
}

export async function deleteSensor(id: number) {
  const [deletedSensor] = await db
    .delete(sensor)
    .where(eq(sensor.id, id))
    .returning();

  assertFound(deletedSensor, 'Sensor', id);

  return deletedSensor;
}
