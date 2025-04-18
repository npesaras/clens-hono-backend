import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { errorHandlerMiddleware } from '@/middlewares/error-handler'
import { routes } from '@/controllers/routes'
import { env } from '@/utils/env'
import { db } from '@/db/dbConfig'
import { cors } from 'hono/cors'
import { sql } from 'drizzle-orm'
import { users } from '@/db/schema'


const app = new Hono()

// Middleware
app.use('*', cors())
app.onError(errorHandlerMiddleware)

/* Health Check */
app.get(env.HEALTH_CHECK_PATH, async (c) => {
  // Check database connection
  let dbStatus = 'ok'
  try {
    // Simple query to verify database connection
    const result = await db.select({ count: sql`1` }).from(users)
    if (!result[0]) dbStatus = 'error'
  } catch (error) {
    dbStatus = 'error'
  }

  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
    database: dbStatus,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  }

  return c.json(health)
})

/* Routes */
routes.forEach((route) => {
  app.route('/', route)
})

// Start the server
serve({
  fetch: app.fetch,
  port: env.PORT
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
  console.log(`Health check available at: http://localhost:${info.port}${env.HEALTH_CHECK_PATH}`)
})