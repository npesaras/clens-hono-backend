import { z } from 'zod';

import { throwBadRequest } from '@/middlewares/error-handler';

// Connection mode enum
export const connectionModeEnum = z.enum(['Wifi', 'lora']);
export type ConnectionMode = z.infer<typeof connectionModeEnum>;

// Validation schemas
export const createSensorDataSchema = z.object({
  sensorId: z.number().int().positive('Sensor ID must be a positive integer'),
  ph: z.number().min(0, 'pH must be non-negative'),
  tds: z.number().min(0, 'TDS must be non-negative'),
  dissolvedOxygen: z.number().min(0, 'Dissolved oxygen must be non-negative'),
  turbidity: z.number().min(0, 'Turbidity must be non-negative'),
  orp: z.number(),
  electricalConductivity: z
    .number()
    .min(0, 'Electrical conductivity must be non-negative'),
  connectionMode: connectionModeEnum,
});

export const updateSensorDataSchema = z.object({
  sensorId: z
    .number()
    .int()
    .positive('Sensor ID must be a positive integer')
    .optional(),
  ph: z.number().min(0, 'pH must be non-negative').optional(),
  tds: z.number().min(0, 'TDS must be non-negative').optional(),
  dissolvedOxygen: z
    .number()
    .min(0, 'Dissolved oxygen must be non-negative')
    .optional(),
  turbidity: z.number().min(0, 'Turbidity must be non-negative').optional(),
  orp: z.number().optional(),
  electricalConductivity: z
    .number()
    .min(0, 'Electrical conductivity must be non-negative')
    .optional(),
  connectionMode: connectionModeEnum.optional(),
});

// Types based on schemas
export type CreateSensorDataInput = z.infer<typeof createSensorDataSchema>;
export type UpdateSensorDataInput = z.infer<typeof updateSensorDataSchema>;

// Helper functions
export function validateCreateSensorData(data: unknown) {
  return createSensorDataSchema.parse(data);
}

export function validateUpdateSensorData(data: unknown) {
  return updateSensorDataSchema.parse(data);
}

export function parseSensorDataId(id: string | undefined): number {
  if (!id) throwBadRequest('Sensor Data ID is required');
  const parsedId = Number(id);
  if (isNaN(parsedId)) throwBadRequest('Invalid sensor data ID');
  return parsedId;
}
