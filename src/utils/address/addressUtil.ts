import { z } from 'zod';

// Validation schemas
export const createAddressSchema = z.object({
    street: z.string().min(1, 'Street is required'),
    barangay: z.string().min(1, 'Barangay is required'),
    city: z.string().min(1, 'City is required'),
    province: z.string().min(1, 'Province is required'),
    zipCode: z.string().min(1, 'ZIP code is required'),
    country: z.string().min(1, 'Country is required').optional(),
    latitude: z.number().min(-90).max(90, 'Latitude must be between -90 and 90').optional(),
    longitude: z.number().min(-180).max(180, 'Longitude must be between -180 and 180').optional()
});

export const updateAddressSchema = z.object({
    street: z.string().min(1, 'Street is required').optional(),
    barangay: z.string().min(1, 'Barangay is required').optional(),
    city: z.string().min(1, 'City is required').optional(),
    province: z.string().min(1, 'Province is required').optional(),
    zipCode: z.string().min(1, 'ZIP code is required').optional(),
    country: z.string().min(1, 'Country is required').optional(),
    latitude: z.number().min(-90).max(90, 'Latitude must be between -90 and 90').optional(),
    longitude: z.number().min(-180).max(180, 'Longitude must be between -180 and 180').optional()
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
