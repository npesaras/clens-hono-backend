import { eq } from 'drizzle-orm';

import { db } from '@/db/dbConfig';
import { truckRoute } from '@/db/schema';
import { assertFound } from '@/middlewares/error-handler';

export type CreateTruckRouteInput = {
  truckId: number;
  route: string;
  validFrom: string;
  validTo: string;
};

export type UpdateTruckRouteInput = Partial<CreateTruckRouteInput>;

export async function createTruckRoute(data: CreateTruckRouteInput) {
  const [newTruckRoute] = await db
    .insert(truckRoute)
    .values({
      ...data,
      validFrom: new Date(data.validFrom),
      validTo: new Date(data.validTo),
    })
    .returning();
  return newTruckRoute;
}

export async function getTruckRoutes() {
  return await db.select().from(truckRoute);
}

export async function getTruckRouteById(id: number) {
  const result = await db
    .select()
    .from(truckRoute)
    .where(eq(truckRoute.id, id));

  const foundTruckRoute = result[0];
  assertFound(foundTruckRoute, ' truck route', id);

  return foundTruckRoute;
}

export async function updateTruckRoute(
  id: number,
  data: UpdateTruckRouteInput
) {
  const updateData: any = { ...data };
  if (data.validFrom) updateData.validFrom = new Date(data.validFrom);
  if (data.validTo) updateData.validTo = new Date(data.validTo);

  const [updatedTruckRoute] = await db
    .update(truckRoute)
    .set(updateData)
    .where(eq(truckRoute.id, id))
    .returning();

  assertFound(updatedTruckRoute, ' truck route', id);

  return updatedTruckRoute;
}

export async function deleteTruckRoute(id: number) {
  const [deletedTruckRoute] = await db
    .delete(truckRoute)
    .where(eq(truckRoute.id, id))
    .returning();

  assertFound(deletedTruckRoute, ' truck route', id);

  return deletedTruckRoute;
}
