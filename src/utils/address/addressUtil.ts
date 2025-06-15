import { z } from 'zod';

// Validation schemas
export const createAddressSchema = z.object({
  street: z.string().min(1, 'Street is required'),
  provinceId: z
    .number()
    .int()
    .positive('Province ID must be a positive integer'),
  cityId: z.number().int().positive('City ID must be a positive integer'),
  barangayId: z
    .number()
    .int()
    .positive('Barangay ID must be a positive integer'),
});

export const updateAddressSchema = z.object({
  street: z.string().min(1, 'Street is required').optional(),
  provinceId: z
    .number()
    .int()
    .positive('Province ID must be a positive integer')
    .optional(),
  cityId: z
    .number()
    .int()
    .positive('City ID must be a positive integer')
    .optional(),
  barangayId: z
    .number()
    .int()
    .positive('Barangay ID must be a positive integer')
    .optional(),
});

// Types based on schemas
export type CreateAddressInput = z.infer<typeof createAddressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;

// Helper functions
export function validateCreateAddress(data: unknown) {
  return createAddressSchema.parse(data);
}

export function validateUpdateAddress(data: unknown) {
  return updateAddressSchema.parse(data);
}

export function parseAddressId(id: string | undefined): number {
  if (!id) throw new Error('Address ID is required');
  const parsedId = Number(id);
  if (isNaN(parsedId)) throw new Error('Invalid address ID');
  return parsedId;
}
