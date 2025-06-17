import { z } from 'zod';

import { throwBadRequest } from '@/middlewares/error-handler';

// Validation schemas
export const createTruckRouteSchema = z.object({
  truckId: z.number().int().positive('Truck ID must be a positive integer'),
  route: z.string().min(1, 'Route is required'),
  validFrom: z.string().datetime('Valid from must be a valid datetime'),
  validTo: z.string().datetime('Valid to must be a valid datetime'),
});

export const updateTruckRouteSchema = z.object({
  truckId: z
    .number()
    .int()
    .positive('Truck ID must be a positive integer')
    .optional(),
  route: z.string().min(1, 'Route is required').optional(),
  validFrom: z
    .string()
    .datetime('Valid from must be a valid datetime')
    .optional(),
  validTo: z.string().datetime('Valid to must be a valid datetime').optional(),
});

// Types based on schemas
export type CreateTruckRouteInput = z.infer<typeof createTruckRouteSchema>;
export type UpdateTruckRouteInput = z.infer<typeof updateTruckRouteSchema>;

// Helper functions
export function validateCreateTruckRoute(data: unknown) {
  return createTruckRouteSchema.parse(data);
}

export function validateUpdateTruckRoute(data: unknown) {
  return updateTruckRouteSchema.parse(data);
}

export function parseTruckRouteId(id: string | undefined): number {
  if (!id) throwBadRequest('Truck Route ID is required');
  const parsedId = Number(id);
  if (isNaN(parsedId)) throwBadRequest('Invalid truck route ID');
  return parsedId;
}
