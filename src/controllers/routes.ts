/**
 * Import user-related routes from the users module
 * This includes all CRUD operations for user management
 */
import usersRoutes from '@/controllers/users/routes';

/**
 * Combine all route modules into a single array
 * Using 'as const' to ensure type safety and prevent modification
 * Currently includes:
 * - usersRoutes: Handles all user-related endpoints (/users/*)
 */
export const routes = [usersRoutes] as const;

/**
 * Type definition for application routes
 * This type represents all possible route handlers in the application
 * Used for type checking and autocompletion when working with routes
 */
export type AppRoutes = (typeof routes)[number];