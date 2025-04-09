import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { errorHandlerMiddleware } from './middlewares/error-handler.js'
import { routes } from './controllers/routes.js'

const app = new Hono()

app.onError(errorHandlerMiddleware);


/* Routes */
routes.forEach((route) => {
  app.route("/", route);
});


// Start the server
serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})