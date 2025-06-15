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
 * Import civilian-related routes from the civilian module
 * This includes all CRUD operations for civilian management
 */
import civilianRoutes from '@/controllers/civilian/routes';

/**
 * Import address-related routes from the address module
 * This includes all CRUD operations for address management
 */
import addressRoutes from '@/controllers/address/routes';

/**
 * Combine all route modules into a single array
 * Using 'as const' to ensure type safety and prevent modification
 * Currently includes:
 * - usersRoutes: Handles all user-related endpoints (/users/*)
 * - adminRoutes: Handles all admin-related endpoints (/admin/*)
 * - civilianRoutes: Handles all civilian-related endpoints (/civilian/*)
 * - addressRoutes: Handles all address-related endpoints (/address/*)
 */
export const routes = [usersRoutes, adminRoutes, civilianRoutes, addressRoutes] as const;

/**
 * Type definition for application routes
 * This type represents all possible route handlers in the application
 * Used for type checking and autocompletion when working with routes
 */
export type AppRoutes = (typeof routes)[number];