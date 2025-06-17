/**
 * Central route configuration module
 * This module imports and combines all route modules for the application
 */

import addressRoutes from '@/controllers/address/routes';
import adminRoutes from '@/controllers/admin/routes';
import civilianRoutes from '@/controllers/civilian/routes';
import collectionScheduleRoutes from '@/controllers/collectionSchedule/routes';
import locationRoutes from '@/controllers/location/routes';
import rewardMultipliersRoutes from '@/controllers/rewardMultipliers/routes';
import sensorRoutes from '@/controllers/sensor/routes';
import sensorDataRoutes from '@/controllers/sensorData/routes';
import trashRecordRoutes from '@/controllers/trashRecord/routes';
import trashStatisticsRoutes from '@/controllers/trashStatistics/routes';
import truckRoutes from '@/controllers/truck/routes';
import truckRouteRoutes from '@/controllers/truckRoute/routes';
import usersRoutes from '@/controllers/users/routes';
import waterQualityStatisticsRoutes from '@/controllers/waterQualityStatistics/routes';

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
