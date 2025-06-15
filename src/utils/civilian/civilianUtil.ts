import { z } from 'zod';

// Validation schemas - exactly matching ERD
export const createCivilianSchema = z.object({
    userId: z.number().int().positive('User ID must be a positive integer'),
    addressId: z.number().int().positive('Address ID must be a positive integer'),
    level: z.number().int().min(1, 'Level must be at least 1'),
    exp: z.number().int().min(0, 'Experience must be non-negative'),
    streak: z.number().int().min(0, 'Streak must be non-negative'),
    leaderboardRank: z.number().int().positive('Leaderboard rank must be positive').optional(),
    totalVolumeDisposed: z.number().min(0, 'Total volume disposed must be non-negative'),
    points: z.number().min(0, 'Points must be non-negative')
});

export const updateCivilianSchema = z.object({
    userId: z.number().int().positive('User ID must be a positive integer').optional(),
    addressId: z.number().int().positive('Address ID must be a positive integer').optional(),
    level: z.number().int().min(1, 'Level must be at least 1').optional(),
    exp: z.number().int().min(0, 'Experience must be non-negative').optional(),
    streak: z.number().int().min(0, 'Streak must be non-negative').optional(),
    leaderboardRank: z.number().int().positive('Leaderboard rank must be positive').optional(),
    totalVolumeDisposed: z.number().min(0, 'Total volume disposed must be non-negative').optional(),
    points: z.number().min(0, 'Points must be non-negative').optional()
});

// Types based on schemas
export type CreateCivilianInput = z.infer<typeof createCivilianSchema>;
export type UpdateCivilianInput = z.infer<typeof updateCivilianSchema>;

// Helper functions
export function validateCreateCivilian(data: unknown) {
    return createCivilianSchema.parse(data);
}

export function validateUpdateCivilian(data: unknown) {
    return updateCivilianSchema.parse(data);
}

export function parseCivilianId(id: string | undefined): number {
    if (!id) throw new Error('Civilian ID is required');
    const parsedId = Number(id);
    if (isNaN(parsedId)) throw new Error('Invalid civilian ID');
    return parsedId;
}
