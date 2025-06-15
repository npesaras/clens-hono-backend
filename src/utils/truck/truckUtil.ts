import { z } from 'zod';

// Validation schemas
export const createTruckSchema = z.object({
    plateNumber: z.string().min(1, 'Plate number is required'),
    active: z.boolean(),
    userId: z.number().int().positive('User ID must be a positive integer'),
    totalCollectedVolume: z.number().min(0, 'Total collected volume must be non-negative')
});

export const updateTruckSchema = z.object({
    plateNumber: z.string().min(1, 'Plate number is required').optional(),
    active: z.boolean().optional(),
    userId: z.number().int().positive('User ID must be a positive integer').optional(),
    totalCollectedVolume: z.number().min(0, 'Total collected volume must be non-negative').optional()
});

// Types based on schemas
export type CreateTruckInput = z.infer<typeof createTruckSchema>;
export type UpdateTruckInput = z.infer<typeof updateTruckSchema>;

// Helper functions
export function validateCreateTruck(data: unknown) {
    return createTruckSchema.parse(data);
}

export function validateUpdateTruck(data: unknown) {
    return updateTruckSchema.parse(data);
}

export function parseTruckId(id: string | undefined): number {
    if (!id) throw new Error('Truck ID is required');
    const parsedId = Number(id);
    if (isNaN(parsedId)) throw new Error('Invalid truck ID');
    return parsedId;
}
