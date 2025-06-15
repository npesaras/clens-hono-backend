import { z } from 'zod';

// Validation schemas
export const createCollectionScheduleSchema = z.object({
  barangayId: z
    .number()
    .int()
    .positive('Barangay ID must be a positive integer'),
  collectionDate: z.string().date('Collection date must be a valid date'),
  collectionTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
      'Collection time must be in HH:MM:SS format'
    ),
});

export const updateCollectionScheduleSchema = z.object({
  barangayId: z
    .number()
    .int()
    .positive('Barangay ID must be a positive integer')
    .optional(),
  collectionDate: z
    .string()
    .date('Collection date must be a valid date')
    .optional(),
  collectionTime: z
    .string()
    .regex(
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
      'Collection time must be in HH:MM:SS format'
    )
    .optional(),
});

// Types based on schemas
export type CreateCollectionScheduleInput = z.infer<
  typeof createCollectionScheduleSchema
>;
export type UpdateCollectionScheduleInput = z.infer<
  typeof updateCollectionScheduleSchema
>;

// Helper functions
export function validateCreateCollectionSchedule(data: unknown) {
  return createCollectionScheduleSchema.parse(data);
}

export function validateUpdateCollectionSchedule(data: unknown) {
  return updateCollectionScheduleSchema.parse(data);
}

export function parseCollectionScheduleId(id: string | undefined): number {
  if (!id) throw new Error('Collection Schedule ID is required');
  const parsedId = Number(id);
  if (isNaN(parsedId)) throw new Error('Invalid collection schedule ID');
  return parsedId;
}
