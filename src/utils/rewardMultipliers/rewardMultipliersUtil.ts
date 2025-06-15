import { z } from 'zod';

// Interval enum
export const intervalEnum = z.enum(['day', 'week', 'month', 'year']);
export type IntervalType = z.infer<typeof intervalEnum>;

// Validation schemas
export const createRewardMultipliersSchema = z.object({
  barangayId: z
    .number()
    .int()
    .positive('Barangay ID must be a positive integer'),
  interval: intervalEnum,
  startDate: z.string().date('Start date must be a valid date'),
  endDate: z.string().date('End date must be a valid date'),
  multiplierExp: z.number().min(0, 'Multiplier exp must be non-negative'),
  multiplierPoints: z.number().min(0, 'Multiplier points must be non-negative'),
});

export const updateRewardMultipliersSchema = z.object({
  barangayId: z
    .number()
    .int()
    .positive('Barangay ID must be a positive integer')
    .optional(),
  interval: intervalEnum.optional(),
  startDate: z.string().date('Start date must be a valid date').optional(),
  endDate: z.string().date('End date must be a valid date').optional(),
  multiplierExp: z
    .number()
    .min(0, 'Multiplier exp must be non-negative')
    .optional(),
  multiplierPoints: z
    .number()
    .min(0, 'Multiplier points must be non-negative')
    .optional(),
});

// Types based on schemas
export type CreateRewardMultipliersInput = z.infer<
  typeof createRewardMultipliersSchema
>;
export type UpdateRewardMultipliersInput = z.infer<
  typeof updateRewardMultipliersSchema
>;

// Helper functions
export function validateCreateRewardMultipliers(data: unknown) {
  return createRewardMultipliersSchema.parse(data);
}

export function validateUpdateRewardMultipliers(data: unknown) {
  return updateRewardMultipliersSchema.parse(data);
}

export function parseRewardMultipliersId(id: string | undefined): number {
  if (!id) throw new Error('Reward Multipliers ID is required');
  const parsedId = Number(id);
  if (isNaN(parsedId)) throw new Error('Invalid reward multipliers ID');
  return parsedId;
}
