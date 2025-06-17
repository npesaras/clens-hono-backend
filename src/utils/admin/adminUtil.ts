import { z } from 'zod';

import { throwBadRequest } from '@/middlewares/error-handler';

// Privilege level enum
export const privilegeLevelEnum = z.enum(['superadmin', 'moderator', 'staff']);
export type PrivilegeLevel = z.infer<typeof privilegeLevelEnum>;

// Validation schemas
export const createAdminSchema = z.object({
  userId: z.number().int().positive('User ID must be a positive integer'),
  privilegeLevel: privilegeLevelEnum,
});

export const updateAdminSchema = z.object({
  userId: z
    .number()
    .int()
    .positive('User ID must be a positive integer')
    .optional(),
  privilegeLevel: privilegeLevelEnum.optional(),
});

// Types based on schemas
export type CreateAdminInput = z.infer<typeof createAdminSchema>;
export type UpdateAdminInput = z.infer<typeof updateAdminSchema>;

// Helper functions
export function validateCreateAdmin(data: unknown) {
  return createAdminSchema.parse(data);
}

export function validateUpdateAdmin(data: unknown) {
  return updateAdminSchema.parse(data);
}

export function parseAdminId(id: string | undefined): number {
  if (!id) throwBadRequest('Admin ID is required');
  const parsedId = Number(id);
  if (isNaN(parsedId)) throwBadRequest('Invalid admin ID');
  return parsedId;
}
