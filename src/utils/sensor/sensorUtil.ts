import { z } from 'zod';

// Sensor type enum
export const sensorTypeEnum = z.enum(['type1', 'type2', 'type3']);
export type SensorType = z.infer<typeof sensorTypeEnum>;

// Validation schemas
export const createSensorSchema = z.object({
    activeStatus: z.boolean(),
    barangayId: z.number().int().positive('Barangay ID must be a positive integer'),
    sensorType: sensorTypeEnum
});

export const updateSensorSchema = z.object({
    activeStatus: z.boolean().optional(),
    barangayId: z.number().int().positive('Barangay ID must be a positive integer').optional(),
    sensorType: sensorTypeEnum.optional()
});

// Types based on schemas
export type CreateSensorInput = z.infer<typeof createSensorSchema>;
export type UpdateSensorInput = z.infer<typeof updateSensorSchema>;

// Helper functions
export function validateCreateSensor(data: unknown) {
    return createSensorSchema.parse(data);
}

export function validateUpdateSensor(data: unknown) {
    return updateSensorSchema.parse(data);
}

export function parseSensorId(id: string | undefined): number {
    if (!id) throw new Error('Sensor ID is required');
    const parsedId = Number(id);
    if (isNaN(parsedId)) throw new Error('Invalid sensor ID');
    return parsedId;
}
