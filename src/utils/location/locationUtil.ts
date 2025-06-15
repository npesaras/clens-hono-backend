import { z } from 'zod';

// Validation schemas
export const createLocationSchema = z.object({
  latitude: z.string().min(1, 'Latitude is required'),
  longitude: z.string().min(1, 'Longitude is required'),
  truckId: z.number().int().positive('Truck ID must be a positive integer'),
});

export const updateLocationSchema = z.object({
  latitude: z.string().min(1, 'Latitude is required').optional(),
  longitude: z.string().min(1, 'Longitude is required').optional(),
  truckId: z
    .number()
    .int()
    .positive('Truck ID must be a positive integer')
    .optional(),
});

// Types based on schemas
export type CreateLocationInput = z.infer<typeof createLocationSchema>;
export type UpdateLocationInput = z.infer<typeof updateLocationSchema>;

// Helper functions
export function validateCreateLocation(data: unknown) {
  return createLocationSchema.parse(data);
}

export function validateUpdateLocation(data: unknown) {
  return updateLocationSchema.parse(data);
}

export function parseLocationId(id: string | undefined): number {
  if (!id) throw new Error('Location ID is required');
  const parsedId = Number(id);
  if (isNaN(parsedId)) throw new Error('Invalid location ID');
  return parsedId;
}
