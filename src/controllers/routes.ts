/**
 * Import user-related routes from the users module
 * This includes all CRUD operations for user management
 */

/**
 * Import admin-related routes from the admin module
 * This includes all CRUD operations for admin management
 */
import addressRoutes from '@/controllers/address/routes';
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

/**
 * Import truck-related routes from the truck module
 * This includes all CRUD operations for truck management
 */
import collectionScheduleRoutes from '@/controllers/collectionSchedule/routes';
import locationRoutes from '@/controllers/location/routes';
import rewardMultipliersRoutes from '@/controllers/rewardMultipliers/routes';
import sensorRoutes from '@/controllers/sensor/routes';
import sensorDataRoutes from '@/controllers/sensorData/routes';
import trashRecordRoutes from '@/controllers/trashRecord/routes';
import trashStatisticsRoutes from '@/controllers/trashStatistics/routes';
import truckRoutes from '@/controllers/truck/routes';

/**
 * Import location-related routes from the location module
 * This includes all CRUD operations for location management
 */

/**
 * Import truck route-related routes from the truckRoute module
 * This includes all CRUD operations for truck route management
 */
import truckRouteRoutes from '@/controllers/truckRoute/routes';

/**
 * Import trash record-related routes from the trashRecord module
 * This includes all CRUD operations for trash record management
 */

/**
 * Import sensor-related routes from the sensor module
 * This includes all CRUD operations for sensor management
 */

/**
 * Import sensor data-related routes from the sensorData module
 * This includes all CRUD operations for sensor data management
 */

/**
 * Import trash statistics-related routes from the trashStatistics module
 * This includes all CRUD operations for trash statistics management
 */

/**
 * Import water quality statistics-related routes from the waterQualityStatistics module
 * This includes all CRUD operations for water quality statistics management
 */
import usersRoutes from '@/controllers/users/routes';
import waterQualityStatisticsRoutes from '@/controllers/waterQualityStatistics/routes';

/**
 * Import collection schedule-related routes from the collectionSchedule module
 * This includes all CRUD operations for collection schedule management
 */

/**
 * Import reward multipliers-related routes from the rewardMultipliers module
 * This includes all CRUD operations for reward multipliers management
 */

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
 * - sensorDataRoutes: Handles all sensor data-related endpoints (/sensor-data/*) * - trashStatisticsRoutes: Handles all trash statistics-related endpoints (/trash-statistics/*)
 * - waterQualityStatisticsRoutes: Handles all water quality statistics-related endpoints (/water-quality-statistics/*)
 * - collectionScheduleRoutes: Handles all collection schedule-related endpoints (/collection-schedules/*)
 * - rewardMultipliersRoutes: Handles all reward multipliers-related endpoints (/reward-multipliers/*)
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
  trashStatisticsRoutes,
  waterQualityStatisticsRoutes,
  collectionScheduleRoutes,
  rewardMultipliersRoutes,
] as const;

/**
 * Type definition for application routes
 * This type represents all possible route handlers in the application
 * Used for type checking and autocompletion when working with routes
 */
export type AppRoutes = (typeof routes)[number];
