import { z } from 'zod';

// Waste type enum
export const wasteTypeEnum = z.enum(['organic', 'recyclable', 'hazardous', 'non-recyclable']);
export type WasteType = z.infer<typeof wasteTypeEnum>;

// Validation schemas
export const createTrashRecordSchema = z.object({
    civilianId: z.number().int().positive('Civilian ID must be a positive integer'),
    volume: z.number().min(0, 'Volume must be non-negative'),
    segregationScore: z.number().min(0, 'Segregation score must be non-negative'),
    recyclingScore: z.number().min(0, 'Recycling score must be non-negative'),
    wasteType: wasteTypeEnum,
    collected: z.boolean(),
    dateDisposed: z.string().datetime('Date disposed must be a valid datetime'),
    dateCollected: z.string().datetime('Date collected must be a valid datetime').optional(),
    collectorId: z.number().int().positive('Collector ID must be a positive integer').optional()
});

export const updateTrashRecordSchema = z.object({
    civilianId: z.number().int().positive('Civilian ID must be a positive integer').optional(),
    volume: z.number().min(0, 'Volume must be non-negative').optional(),
    segregationScore: z.number().min(0, 'Segregation score must be non-negative').optional(),
    recyclingScore: z.number().min(0, 'Recycling score must be non-negative').optional(),
    wasteType: wasteTypeEnum.optional(),
    collected: z.boolean().optional(),
    dateDisposed: z.string().datetime('Date disposed must be a valid datetime').optional(),
    dateCollected: z.string().datetime('Date collected must be a valid datetime').optional(),
    collectorId: z.number().int().positive('Collector ID must be a positive integer').optional()
});

// Types based on schemas
export type CreateTrashRecordInput = z.infer<typeof createTrashRecordSchema>;
export type UpdateTrashRecordInput = z.infer<typeof updateTrashRecordSchema>;

// Helper functions
export function validateCreateTrashRecord(data: unknown) {
    return createTrashRecordSchema.parse(data);
}

export function validateUpdateTrashRecord(data: unknown) {
    return updateTrashRecordSchema.parse(data);
}

export function parseTrashRecordId(id: string | undefined): number {
    if (!id) throw new Error('Trash Record ID is required');
    const parsedId = Number(id);
    if (isNaN(parsedId)) throw new Error('Invalid trash record ID');
    return parsedId;
}
