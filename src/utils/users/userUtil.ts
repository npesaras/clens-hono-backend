import { z } from 'zod';

// User type enum
export const userTypeEnum = z.enum(['admin', 'civilian', 'collector']);
export type UserType = z.infer<typeof userTypeEnum>;

// Validation schemas - exactly matching ERD field names
export const createUserSchema = z.object({
    usertype: userTypeEnum,
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email format'),
    firstName: z.string().min(1, 'First name is required'),
    middleName: z.string().min(1, 'Middle name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    password: z.string().min(8, 'Password must be at least 8 characters')
});

export const updateUserSchema = z.object({
    usertype: userTypeEnum.optional(),
    username: z.string().min(3, 'Username must be at least 3 characters').optional(),
    email: z.string().email('Invalid email format').optional(),
    firstName: z.string().min(1, 'First name is required').optional(),
    middleName: z.string().min(1, 'Middle name is required').optional(),
    lastName: z.string().min(1, 'Last name is required').optional()
});

// Types based on schemas
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

// Helper functions
export function validateCreateUser(data: unknown) {
    return createUserSchema.parse(data);
}

export function validateUpdateUser(data: unknown) {
    return updateUserSchema.parse(data);
}

export function parseUserId(id: string | undefined): number {
    if (!id) throw new Error('User ID is required');
    const parsedId = Number(id);
    if (isNaN(parsedId)) throw new Error('Invalid user ID');
    return parsedId;
}
