// Define your OpenAPI info
export const openApiDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Hono API',
    description: 'RESTful API built with Hono, Drizzle, and PostgreSQL',
    version: '1.0.0',
    contact: {
      name: 'API Support',
      email: 'example@example.com',
    },
  },
  servers: [
    {
      url: '/',
      description: 'Local development server',
    },
  ],
  tags: [
    {
      name: 'Users',
      description: 'API endpoints for managing users',
    },
    {
      name: 'Health',
      description: 'API health check endpoint',
    },
  ],
  paths: {
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'Get all users',
        description: 'Retrieves a list of all active (non-deleted) users',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Users'],
        summary: 'Create a new user',
        description: 'Creates a new user with the provided information',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateUserInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/users/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the user',
          schema: {
            type: 'number',
          },
        },
      ],
      get: {
        tags: ['Users'],
        summary: 'Get a user by ID',
        description: 'Retrieves a specific user by their ID',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'User details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        tags: ['Users'],
        summary: 'Update a user',
        description: 'Updates a specific user with the provided information',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateUserInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      delete: {
        tags: ['Users'],
        summary: 'Delete a user',
        description: 'Soft-deletes a user by setting the deletedAt timestamp',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'User deleted successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'API Health Check',
        description: 'Checks the health status of the API and its dependencies',
        responses: {
          '200': {
            description: 'Health status information',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: { type: 'string', example: 'ok' },
                    timestamp: { type: 'string', format: 'date-time' },
                    environment: { type: 'string', example: 'development' },
                    database: { type: 'string', example: 'ok' },
                    uptime: { type: 'number', example: 123.45 },
                    memory: {
                      type: 'object',
                      properties: {
                        rss: { type: 'number' },
                        heapTotal: { type: 'number' },
                        heapUsed: { type: 'number' },
                        external: { type: 'number' },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'token',
        description: 'Enter your API token',
      },
    },
    schemas: {
      UserType: {
        type: 'string',
        enum: ['admin', 'civilian', 'collector'],
        description: 'Type of user account',
      },
      User: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          usertype: { $ref: '#/components/schemas/UserType' },
          username: { type: 'string', example: 'johndoe' },
          email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
          firstname: { type: 'string', example: 'John' },
          middlename: { type: 'string', example: 'Robert' },
          lastname: { type: 'string', example: 'Doe' },
          password: { type: 'string', description: 'Hashed password - never exposed to clients' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          deletedAt: { type: 'string', format: 'date-time', nullable: true },
        },
      },
      CreateUserInput: {
        type: 'object',
        required: ['usertype', 'username', 'email', 'firstname', 'middlename', 'lastname', 'password'],
        properties: {
          usertype: { $ref: '#/components/schemas/UserType' },
          username: { type: 'string', example: 'johndoe' },
          email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
          firstname: { type: 'string', example: 'John' },
          middlename: { type: 'string', example: 'Robert' },
          lastname: { type: 'string', example: 'Doe' },
          password: { type: 'string', format: 'password', example: 'SecurePassword123!' },
        },
      },
      UpdateUserInput: {
        type: 'object',
        properties: {
          usertype: { $ref: '#/components/schemas/UserType' },
          username: { type: 'string', example: 'johndoe' },
          email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
          firstname: { type: 'string', example: 'John' },
          middlename: { type: 'string', example: 'Robert' },
          lastname: { type: 'string', example: 'Doe' },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'NotFoundError' },
          message: { type: 'string', example: 'User not found' },
        },
      },
    },
    responses: {
      BadRequest: {
        description: 'Bad Request - Invalid input data',
        content: {
          'application/json': {
            schema: {
              allOf: [
                { $ref: '#/components/schemas/ErrorResponse' },
                {
                  type: 'object',
                  properties: {
                    name: { example: 'BadRequestError' },
                    message: { example: 'Invalid input' },
                    issues: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          code: { type: 'string' },
                          path: { type: 'array', items: { type: 'string' } },
                          message: { type: 'string' },
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      },
      Unauthorized: {
        description: 'Unauthorized - Missing or invalid authentication',
        content: {
          'application/json': {
            schema: {
              allOf: [
                { $ref: '#/components/schemas/ErrorResponse' },
                {
                  type: 'object',
                  properties: {
                    name: { example: 'UnauthorizedError' },
                    message: { example: 'Access token is required' },
                  },
                },
              ],
            },
          },
        },
      },
      NotFound: {
        description: 'Not Found - The specified resource was not found',
        content: {
          'application/json': {
            schema: {
              allOf: [
                { $ref: '#/components/schemas/ErrorResponse' },
                {
                  type: 'object',
                  properties: {
                    name: { example: 'NotFoundError' },
                    message: { example: 'User not found' },
                  },
                },
              ],
            },
          },
        },
      },
    },
  },
} 