import { Hono } from 'hono';
import usersRoutes from '@/controllers/users/routes';

export const routes = [usersRoutes] as const;

export type AppRoutes = (typeof routes)[number];