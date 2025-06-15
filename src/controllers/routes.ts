/**
 * Import user-related routes from the users module
 * This includes all CRUD operations for user management
 */
import usersRoutes from '@/controllers/users/routes';

/**
 * Import admin-related routes from the admin module
 * This includes all CRUD operations for admin management
 */
import adminRoutes from '@/controllers/admin/routes';

/**
 * Combine all route modules into a single array
 * Using 'as const' to ensure type safety and prevent modification
 * Currently includes:
 * - usersRoutes: Handles all user-related endpoints (/users/*)
 * - adminRoutes: Handles all admin-related endpoints (/admin/*)
 */
export const routes = [usersRoutes, adminRoutes] as const;

/**
 * Type definition for application routes
 * This type represents all possible route handlers in the application
 * Used for type checking and autocompletion when working with routes
 */
export type AppRoutes = (typeof routes)[number];