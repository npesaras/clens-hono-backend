import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { db } from './db/config.js'
import { users } from './db/schema.js'
import * as dotenv from 'dotenv'

dotenv.config()

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// Example route using Drizzle
app.get('/users', async (c) => {
  try {
    const allUsers = await db.select().from(users)
    return c.json(allUsers)
  } catch (error) {
    console.error('Database error:', error)
    return c.json({ error: 'Internal Server Error' }, 500)
  }
})

// Create a new user
app.post('/users', async (c) => {
  try {
    const body = await c.req.json()
    
    // Validate required fields
    if (!body.name || !body.email) {
      return c.json({ error: 'Name and email are required' }, 400)
    }

    const newUser = await db.insert(users).values({
      name: body.name,
      email: body.email,
    }).returning()

    return c.json(newUser[0], 201)
  } catch (error) {
    console.error('Database error:', error)
    return c.json({ error: 'Internal Server Error' }, 500)
  }
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})