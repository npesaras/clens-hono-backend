import { z } from 'zod';

// Statistics type enum
export const statisticsTypeEnum = z.enum(['civilian', 'barangay']);
export type StatisticsType = z.infer<typeof statisticsTypeEnum>;

// Validation schemas
export const createTrashStatisticsSchema = z.object({
  type: statisticsTypeEnum,
  entityId: z.number().int().positive('Entity ID must be a positive integer'),
  leaderboardRank: z
    .number()
    .int()
    .positive('Leaderboard rank must be a positive integer'),
  totalDisposed: z.number().min(0, 'Total disposed must be non-negative'),
});

export const updateTrashStatisticsSchema = z.object({
  type: statisticsTypeEnum.optional(),
  entityId: z
    .number()
    .int()
    .positive('Entity ID must be a positive integer')
    .optional(),
  leaderboardRank: z
    .number()
    .int()
    .positive('Leaderboard rank must be a positive integer')
    .optional(),
  totalDisposed: z
    .number()
    .min(0, 'Total disposed must be non-negative')
    .optional(),
});

// Types based on schemas
export type CreateTrashStatisticsInput = z.infer<
  typeof createTrashStatisticsSchema
>;
export type UpdateTrashStatisticsInput = z.infer<
  typeof updateTrashStatisticsSchema
>;

// Helper functions
export function validateCreateTrashStatistics(data: unknown) {
  return createTrashStatisticsSchema.parse(data);
}

export function validateUpdateTrashStatistics(data: unknown) {
  return updateTrashStatisticsSchema.parse(data);
}

export function parseTrashStatisticsId(id: string | undefined): number {
  if (!id) throw new Error('Trash Statistics ID is required');
  const parsedId = Number(id);
  if (isNaN(parsedId)) throw new Error('Invalid trash statistics ID');
  return parsedId;
}
