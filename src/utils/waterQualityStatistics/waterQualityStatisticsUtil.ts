import { z } from 'zod';

// Interval enum
export const intervalEnum = z.enum(['day', 'week', 'month', 'year']);
export type IntervalType = z.infer<typeof intervalEnum>;

// Validation schemas
export const createWaterQualityStatisticsSchema = z.object({
    interval: intervalEnum,
    startDate: z.string().date('Start date must be a valid date'),
    sensorId: z.number().int().positive('Sensor ID must be a positive integer'),
    avePh: z.number().min(0, 'Average pH must be non-negative'),
    aveTds: z.number().min(0, 'Average TDS must be non-negative'),
    aveDissolvedOxygen: z.number().min(0, 'Average dissolved oxygen must be non-negative'),
    aveTurbidity: z.number().min(0, 'Average turbidity must be non-negative'),
    aveOrp: z.number(),
    aveElectricalConductivity: z.number().min(0, 'Average electrical conductivity must be non-negative')
});

export const updateWaterQualityStatisticsSchema = z.object({
    sensorId: z.number().int().positive('Sensor ID must be a positive integer').optional(),
    avePh: z.number().min(0, 'Average pH must be non-negative').optional(),
    aveTds: z.number().min(0, 'Average TDS must be non-negative').optional(),
    aveDissolvedOxygen: z.number().min(0, 'Average dissolved oxygen must be non-negative').optional(),
    aveTurbidity: z.number().min(0, 'Average turbidity must be non-negative').optional(),
    aveOrp: z.number().optional(),
    aveElectricalConductivity: z.number().min(0, 'Average electrical conductivity must be non-negative').optional()
});

// Types based on schemas
export type CreateWaterQualityStatisticsInput = z.infer<typeof createWaterQualityStatisticsSchema>;
export type UpdateWaterQualityStatisticsInput = z.infer<typeof updateWaterQualityStatisticsSchema>;

// Helper functions
export function validateCreateWaterQualityStatistics(data: unknown) {
    return createWaterQualityStatisticsSchema.parse(data);
}

export function validateUpdateWaterQualityStatistics(data: unknown) {
    return updateWaterQualityStatisticsSchema.parse(data);
}

export function parseWaterQualityStatisticsKey(interval: string | undefined, startDate: string | undefined): { interval: IntervalType, startDate: string } {
    if (!interval || !startDate) throw new Error('Interval and start date are required');
    return { interval: intervalEnum.parse(interval), startDate };
}
