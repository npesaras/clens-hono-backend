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
 * Import truck-related routes from the truck module
 * This includes all CRUD operations for truck management
 */
import truckRoutes from '@/controllers/truck/routes';

/**
 * Import location-related routes from the location module
 * This includes all CRUD operations for location management
 */
import locationRoutes from '@/controllers/location/routes';

/**
 * Import truck route-related routes from the truckRoute module
 * This includes all CRUD operations for truck route management
 */
import truckRouteRoutes from '@/controllers/truckRoute/routes';

/**
 * Import trash record-related routes from the trashRecord module
 * This includes all CRUD operations for trash record management
 */
import trashRecordRoutes from '@/controllers/trashRecord/routes';

/**
 * Import sensor-related routes from the sensor module
 * This includes all CRUD operations for sensor management
 */
import sensorRoutes from '@/controllers/sensor/routes';

/**
 * Import sensor data-related routes from the sensorData module
 * This includes all CRUD operations for sensor data management
 */
import sensorDataRoutes from '@/controllers/sensorData/routes';

/**
 * Import trash statistics-related routes from the trashStatistics module
 * This includes all CRUD operations for trash statistics management
 */
import trashStatisticsRoutes from '@/controllers/trashStatistics/routes';

/**
 * Combine all route modules into a single array
 * Using 'as const' to ensure type safety and prevent modification
 * Currently includes:
 * - usersRoutes: Handles all user-related endpoints (/users/*)
 * - adminRoutes: Handles all admin-related endpoints (/admin/*)
 * - civilianRoutes: Handles all civilian-related endpoints (/civilian/*)
 * - addressRoutes: Handles all address-related endpoints (/address/*)
 * - truckRoutes: Handles all truck-related endpoints (/trucks/*)
 * - locationRoutes: Handles all location-related endpoints (/locations/*)
 * - truckRouteRoutes: Handles all truck route-related endpoints (/truck-routes/*)
 * - trashRecordRoutes: Handles all trash record-related endpoints (/trash-records/*)
 * - sensorRoutes: Handles all sensor-related endpoints (/sensors/*)
 * - sensorDataRoutes: Handles all sensor data-related endpoints (/sensor-data/*)
 * - trashStatisticsRoutes: Handles all trash statistics-related endpoints (/trash-statistics/*)
 */
export const routes = [
  usersRoutes, 
  adminRoutes, 
  civilianRoutes, 
  addressRoutes, 
  truckRoutes, 
  locationRoutes, 
  truckRouteRoutes, 
  trashRecordRoutes, 
  sensorRoutes, 
  sensorDataRoutes, 
  trashStatisticsRoutes
] as const;

/**
 * Type definition for application routes
 * This type represents all possible route handlers in the application
 * Used for type checking and autocompletion when working with routes
 */
export type AppRoutes = (typeof routes)[number];