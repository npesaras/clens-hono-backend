import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { db } from './db/config.js'
import { users } from './db/schema.js'
import * as dotenv from 'dotenv'
import { errorHandlerMiddleware } from './middlewares/error-handler.js'

dotenv.config()

const app = new Hono()

app.onError(errorHandlerMiddleware);

/* Routes */
routes.forEach((route) => {
  app.route("/", route);
});

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})