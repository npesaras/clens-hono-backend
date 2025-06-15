// Define your OpenAPI info
export const openApiDocument = {
  openapi: '3.0.0',
  info: {
    title: 'CLENS Hono API',
    description: 'RESTful API built with Hono, Drizzle, and PostgreSQL',
    version: '1.0.0',
    contact: {
      name: 'API Support'
    },
  },
  servers: [
    {
      url: '/',
      description: 'Local development server',
    },
  ],  tags: [
    {
      name: 'Users',
      description: 'API endpoints for managing users',
    },
    {
      name: 'Admin',
      description: 'API endpoints for managing administrators',
    },
    {
      name: 'Civilian',
      description: 'API endpoints for managing civilians',
    },
    {
      name: 'Address',
      description: 'API endpoints for managing addresses',
    },
    {
      name: 'Truck',
      description: 'API endpoints for managing trucks',
    },
    {
      name: 'Location',
      description: 'API endpoints for managing truck locations',
    },
    {
      name: 'Truck Route',
      description: 'API endpoints for managing truck routes',
    },
    {
      name: 'Trash Record',
      description: 'API endpoints for managing trash disposal records',
    },
    {
      name: 'Sensor',
      description: 'API endpoints for managing sensors',
    },
    {
      name: 'Sensor Data',
      description: 'API endpoints for managing sensor data',
    },
    {
      name: 'Trash Statistics',
      description: 'API endpoints for managing trash statistics',
    },
    {
      name: 'Water Quality Statistics',
      description: 'API endpoints for managing water quality statistics',
    },
    {
      name: 'Collection Schedule',
      description: 'API endpoints for managing collection schedules',
    },
    {
      name: 'Reward Multipliers',
      description: 'API endpoints for managing reward multipliers',
    },
    {
      name: 'Health',
      description: 'API health check endpoint',
    },
  ],  paths: {
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
    '/admin': {
      get: {
        tags: ['Admin'],
        summary: 'Get all admins',
        description: 'Retrieves a list of all active admins with their user information',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of admins',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Admin',
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Admin'],
        summary: 'Create a new admin',
        description: 'Creates a new admin record for an existing user',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateAdminInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Admin created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Admin',
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/admin/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the admin',
          schema: {
            type: 'number',
          },
        },
      ],
      get: {
        tags: ['Admin'],
        summary: 'Get an admin by ID',
        description: 'Retrieves a specific admin by their ID',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Admin details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Admin',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        tags: ['Admin'],
        summary: 'Update an admin',
        description: 'Updates a specific admin with the provided information',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateAdminInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Admin updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Admin',
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
        tags: ['Admin'],
        summary: 'Delete an admin',
        description: 'Soft-deletes an admin by setting the deletedAt timestamp',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Admin deleted successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Admin',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/civilian': {
      get: {
        tags: ['Civilian'],
        summary: 'Get all civilians',
        description: 'Retrieves a list of all active civilians with their user and address information',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of civilians',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Civilian',
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Civilian'],
        summary: 'Create a new civilian',
        description: 'Creates a new civilian record for an existing user',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateCivilianInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Civilian created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Civilian',
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/civilian/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the civilian',
          schema: {
            type: 'number',
          },
        },
      ],
      get: {
        tags: ['Civilian'],
        summary: 'Get a civilian by ID',
        description: 'Retrieves a specific civilian by their ID',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Civilian details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Civilian',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        tags: ['Civilian'],
        summary: 'Update a civilian',
        description: 'Updates a specific civilian with the provided information',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateCivilianInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Civilian updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Civilian',
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
        tags: ['Civilian'],
        summary: 'Delete a civilian',
        description: 'Soft-deletes a civilian by setting the deletedAt timestamp',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Civilian deleted successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Civilian',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/address': {
      get: {
        tags: ['Address'],
        summary: 'Get all addresses',
        description: 'Retrieves a list of all active addresses with province, city, and barangay information',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of addresses',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Address',
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Address'],
        summary: 'Create a new address',
        description: 'Creates a new address record',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateAddressInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Address created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Address',
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/address/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the address',
          schema: {
            type: 'number',
          },
        },
      ],
      get: {
        tags: ['Address'],
        summary: 'Get an address by ID',
        description: 'Retrieves a specific address by its ID',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Address details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Address',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        tags: ['Address'],
        summary: 'Update an address',
        description: 'Updates a specific address with the provided information',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateAddressInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Address updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Address',
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
        tags: ['Address'],
        summary: 'Delete an address',
        description: 'Soft-deletes an address by setting the deletedAt timestamp',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Address deleted successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Address',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/trucks': {
      get: {
        tags: ['Truck'],
        summary: 'Get all trucks',
        description: 'Retrieves a list of all active trucks',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of trucks',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Truck',
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Truck'],
        summary: 'Create a new truck',
        description: 'Creates a new truck record',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateTruckInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Truck created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Truck',
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/trucks/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the truck',
          schema: {
            type: 'number',
          },
        },
      ],
      get: {
        tags: ['Truck'],
        summary: 'Get a truck by ID',
        description: 'Retrieves a specific truck by its ID',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Truck details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Truck',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        tags: ['Truck'],
        summary: 'Update a truck',
        description: 'Updates a specific truck with the provided information',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateTruckInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Truck updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Truck',
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
        tags: ['Truck'],
        summary: 'Delete a truck',
        description: 'Soft-deletes a truck by setting the deletedAt timestamp',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Truck deleted successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Truck',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/locations': {
      get: {
        tags: ['Location'],
        summary: 'Get all locations',
        description: 'Retrieves a list of all active truck locations',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of locations',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Location',
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Location'],
        summary: 'Create a new location',
        description: 'Creates a new location record for a truck',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateLocationInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Location created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Location',
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/locations/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the location',
          schema: {
            type: 'number',
          },
        },
      ],
      get: {
        tags: ['Location'],
        summary: 'Get a location by ID',
        description: 'Retrieves a specific location by its ID',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Location details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Location',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        tags: ['Location'],
        summary: 'Update a location',
        description: 'Updates a specific location with the provided information',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateLocationInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Location updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Location',
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
        tags: ['Location'],
        summary: 'Delete a location',
        description: 'Soft-deletes a location by setting the deletedAt timestamp',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Location deleted successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Location',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },    },
    '/truck': {
      get: {
        tags: ['Truck'],
        summary: 'Get all trucks',
        description: 'Retrieves a list of all active trucks',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of trucks',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Truck',
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Truck'],
        summary: 'Create a new truck',
        description: 'Creates a new truck with the provided information',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateTruckInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Truck created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Truck',
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/truck/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the truck',
          schema: {
            type: 'number',
          },
        },
      ],
      get: {
        tags: ['Truck'],
        summary: 'Get a truck by ID',
        description: 'Retrieves a specific truck by its ID',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Truck details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Truck',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        tags: ['Truck'],
        summary: 'Update a truck',
        description: 'Updates a specific truck with the provided information',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateTruckInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Truck updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Truck',
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
        tags: ['Truck'],
        summary: 'Delete a truck',
        description: 'Soft-deletes a truck by setting the deletedAt timestamp',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Truck deleted successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Truck',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/truck-route': {
      get: {
        tags: ['Truck Route'],
        summary: 'Get all truck routes',
        description: 'Retrieves a list of all truck routes',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of truck routes',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/TruckRoute',
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Truck Route'],
        summary: 'Create a new truck route',
        description: 'Creates a new truck route with the provided information',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateTruckRouteInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Truck route created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TruckRoute',
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/truck-route/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the truck route',
          schema: {
            type: 'number',
          },
        },
      ],
      get: {
        tags: ['Truck Route'],
        summary: 'Get a truck route by ID',
        description: 'Retrieves a specific truck route by its ID',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Truck route details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TruckRoute',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        tags: ['Truck Route'],
        summary: 'Update a truck route',
        description: 'Updates a specific truck route with the provided information',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateTruckRouteInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Truck route updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TruckRoute',
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
        tags: ['Truck Route'],
        summary: 'Delete a truck route',
        description: 'Deletes a truck route record',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Truck route deleted successfully',
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/trash-record': {
      get: {
        tags: ['Trash Record'],
        summary: 'Get all trash records',
        description: 'Retrieves a list of all trash disposal records',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of trash records',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/TrashRecord',
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Trash Record'],
        summary: 'Create a new trash record',
        description: 'Creates a new trash disposal record',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateTrashRecordInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Trash record created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TrashRecord',
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/trash-record/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the trash record',
          schema: {
            type: 'number',
          },
        },
      ],
      get: {
        tags: ['Trash Record'],
        summary: 'Get a trash record by ID',
        description: 'Retrieves a specific trash record by its ID',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Trash record details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TrashRecord',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        tags: ['Trash Record'],
        summary: 'Update a trash record',
        description: 'Updates a specific trash record with the provided information',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateTrashRecordInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Trash record updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TrashRecord',
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
        tags: ['Trash Record'],
        summary: 'Delete a trash record',
        description: 'Soft-deletes a trash record by setting the deletedAt timestamp',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Trash record deleted successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TrashRecord',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/sensor': {
      get: {
        tags: ['Sensor'],
        summary: 'Get all sensors',
        description: 'Retrieves a list of all sensors',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of sensors',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Sensor',
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Sensor'],
        summary: 'Create a new sensor',
        description: 'Creates a new sensor with the provided information',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateSensorInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Sensor created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Sensor',
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/sensor/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the sensor',
          schema: {
            type: 'number',
          },
        },
      ],
      get: {
        tags: ['Sensor'],
        summary: 'Get a sensor by ID',
        description: 'Retrieves a specific sensor by its ID',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Sensor details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Sensor',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        tags: ['Sensor'],
        summary: 'Update a sensor',
        description: 'Updates a specific sensor with the provided information',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateSensorInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Sensor updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Sensor',
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
        tags: ['Sensor'],
        summary: 'Delete a sensor',
        description: 'Deletes a sensor record',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Sensor deleted successfully',
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/sensor-data': {
      get: {
        tags: ['Sensor Data'],
        summary: 'Get all sensor data',
        description: 'Retrieves a list of all sensor data records',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of sensor data',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/SensorData',
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Sensor Data'],
        summary: 'Create new sensor data',
        description: 'Creates a new sensor data record',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateSensorDataInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Sensor data created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SensorData',
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/sensor-data/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the sensor data record',
          schema: {
            type: 'number',
          },
        },
      ],
      get: {
        tags: ['Sensor Data'],
        summary: 'Get sensor data by ID',
        description: 'Retrieves a specific sensor data record by its ID',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Sensor data details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SensorData',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        tags: ['Sensor Data'],
        summary: 'Update sensor data',
        description: 'Updates a specific sensor data record with the provided information',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateSensorDataInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Sensor data updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SensorData',
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
        tags: ['Sensor Data'],
        summary: 'Delete sensor data',
        description: 'Soft-deletes a sensor data record by setting the deletedAt timestamp',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Sensor data deleted successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/SensorData',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/trash-statistics': {
      get: {
        tags: ['Trash Statistics'],
        summary: 'Get all trash statistics',
        description: 'Retrieves a list of all trash statistics records',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of trash statistics',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/TrashStatistics',
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Trash Statistics'],
        summary: 'Create new trash statistics',
        description: 'Creates a new trash statistics record',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateTrashStatisticsInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Trash statistics created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TrashStatistics',
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/trash-statistics/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the trash statistics record',
          schema: {
            type: 'number',
          },
        },
      ],
      get: {
        tags: ['Trash Statistics'],
        summary: 'Get trash statistics by ID',
        description: 'Retrieves a specific trash statistics record by its ID',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Trash statistics details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TrashStatistics',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        tags: ['Trash Statistics'],
        summary: 'Update trash statistics',
        description: 'Updates a specific trash statistics record with the provided information',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateTrashStatisticsInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Trash statistics updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TrashStatistics',
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
        tags: ['Trash Statistics'],
        summary: 'Delete trash statistics',
        description: 'Soft-deletes a trash statistics record by setting the deletedAt timestamp',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Trash statistics deleted successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/TrashStatistics',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/water-quality-statistics': {
      get: {
        tags: ['Water Quality Statistics'],
        summary: 'Get all water quality statistics',
        description: 'Retrieves a list of all water quality statistics records',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of water quality statistics',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/WaterQualityStatistics',
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Water Quality Statistics'],
        summary: 'Create new water quality statistics',
        description: 'Creates a new water quality statistics record',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateWaterQualityStatisticsInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Water quality statistics created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/WaterQualityStatistics',
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/water-quality-statistics/{interval}/{startDate}/{sensorId}': {
      parameters: [
        {
          name: 'interval',
          in: 'path',
          required: true,
          description: 'Time interval type',
          schema: {
            $ref: '#/components/schemas/IntervalType',
          },
        },
        {
          name: 'startDate',
          in: 'path',
          required: true,
          description: 'Start date of the statistics period',
          schema: {
            type: 'string',
            format: 'date',
          },
        },
        {
          name: 'sensorId',
          in: 'path',
          required: true,
          description: 'ID of the sensor',
          schema: {
            type: 'number',
          },
        },
      ],
      get: {
        tags: ['Water Quality Statistics'],
        summary: 'Get water quality statistics by composite key',
        description: 'Retrieves a specific water quality statistics record by its composite key',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Water quality statistics details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/WaterQualityStatistics',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        tags: ['Water Quality Statistics'],
        summary: 'Update water quality statistics',
        description: 'Updates a specific water quality statistics record with the provided information',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateWaterQualityStatisticsInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Water quality statistics updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/WaterQualityStatistics',
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
        tags: ['Water Quality Statistics'],
        summary: 'Delete water quality statistics',
        description: 'Deletes a water quality statistics record',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Water quality statistics deleted successfully',
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/collection-schedule': {
      get: {
        tags: ['Collection Schedule'],
        summary: 'Get all collection schedules',
        description: 'Retrieves a list of all collection schedules',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of collection schedules',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/CollectionSchedule',
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Collection Schedule'],
        summary: 'Create a new collection schedule',
        description: 'Creates a new collection schedule',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateCollectionScheduleInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Collection schedule created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CollectionSchedule',
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/collection-schedule/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the collection schedule',
          schema: {
            type: 'number',
          },
        },
      ],
      get: {
        tags: ['Collection Schedule'],
        summary: 'Get a collection schedule by ID',
        description: 'Retrieves a specific collection schedule by its ID',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Collection schedule details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CollectionSchedule',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        tags: ['Collection Schedule'],
        summary: 'Update a collection schedule',
        description: 'Updates a specific collection schedule with the provided information',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateCollectionScheduleInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Collection schedule updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CollectionSchedule',
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
        tags: ['Collection Schedule'],
        summary: 'Delete a collection schedule',
        description: 'Deletes a collection schedule record',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Collection schedule deleted successfully',
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
    '/reward-multipliers': {
      get: {
        tags: ['Reward Multipliers'],
        summary: 'Get all reward multipliers',
        description: 'Retrieves a list of all reward multipliers',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'List of reward multipliers',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/RewardMultipliers',
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Reward Multipliers'],
        summary: 'Create new reward multipliers',
        description: 'Creates a new reward multipliers record',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateRewardMultipliersInput',
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Reward multipliers created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RewardMultipliers',
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/BadRequest' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },
    '/reward-multipliers/{id}': {
      parameters: [
        {
          name: 'id',
          in: 'path',
          required: true,
          description: 'ID of the reward multipliers record',
          schema: {
            type: 'number',
          },
        },
      ],
      get: {
        tags: ['Reward Multipliers'],
        summary: 'Get reward multipliers by ID',
        description: 'Retrieves a specific reward multipliers record by its ID',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Reward multipliers details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RewardMultipliers',
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        tags: ['Reward Multipliers'],
        summary: 'Update reward multipliers',
        description: 'Updates a specific reward multipliers record with the provided information',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateRewardMultipliersInput',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Reward multipliers updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RewardMultipliers',
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
        tags: ['Reward Multipliers'],
        summary: 'Delete reward multipliers',
        description: 'Deletes a reward multipliers record',
        security: [{ bearerAuth: [] }],
        responses: {
          '200': {
            description: 'Reward multipliers deleted successfully',
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
    },    schemas: {
      // ENUMS
      UserType: {
        type: 'string',
        enum: ['admin', 'civilian', 'collector'],
        description: 'Type of user account',
      },
      PrivilegeLevel: {
        type: 'string',
        enum: ['superadmin', 'moderator', 'staff'],
        description: 'Admin privilege level',
      },
      WasteType: {
        type: 'string',
        enum: ['organic', 'recyclable', 'hazardous', 'non-recyclable'],
        description: 'Type of waste',
      },
      SensorType: {
        type: 'string',
        enum: ['type1', 'type2', 'type3'],
        description: 'Type of sensor',
      },
      ConnectionMode: {
        type: 'string',
        enum: ['Wifi', 'lora'],
        description: 'Sensor connection mode',
      },
      StatisticsType: {
        type: 'string',
        enum: ['civilian', 'barangay'],
        description: 'Type of statistics entity',
      },
      IntervalType: {
        type: 'string',
        enum: ['day', 'week', 'month', 'year'],
        description: 'Time interval type',
      },

      // USER SCHEMAS
      User: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          usertype: { $ref: '#/components/schemas/UserType' },
          username: { type: 'string', example: 'johndoe' },
          email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
          firstName: { type: 'string', example: 'John' },
          middleName: { type: 'string', example: 'Robert' },
          lastName: { type: 'string', example: 'Doe' },
          password: { type: 'string', description: 'Hashed password - never exposed to clients' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          deletedAt: { type: 'string', format: 'date-time', nullable: true },
        },
      },
      CreateUserInput: {
        type: 'object',
        required: ['usertype', 'username', 'email', 'firstName', 'middleName', 'lastName', 'password'],
        properties: {
          usertype: { $ref: '#/components/schemas/UserType' },
          username: { type: 'string', example: 'johndoe' },
          email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
          firstName: { type: 'string', example: 'John' },
          middleName: { type: 'string', example: 'Robert' },
          lastName: { type: 'string', example: 'Doe' },
          password: { type: 'string', format: 'password', example: 'SecurePassword123!' },
        },
      },
      UpdateUserInput: {
        type: 'object',
        properties: {
          usertype: { $ref: '#/components/schemas/UserType' },
          username: { type: 'string', example: 'johndoe' },
          email: { type: 'string', format: 'email', example: 'john.doe@example.com' },
          firstName: { type: 'string', example: 'John' },
          middleName: { type: 'string', example: 'Robert' },
          lastName: { type: 'string', example: 'Doe' },
        },
      },

      // ADMIN SCHEMAS
      Admin: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          userId: { type: 'number', example: 1 },
          privilegeLevel: { $ref: '#/components/schemas/PrivilegeLevel' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          deletedAt: { type: 'string', format: 'date-time', nullable: true },
          user: { $ref: '#/components/schemas/User' },
        },
      },
      CreateAdminInput: {
        type: 'object',
        required: ['userId', 'privilegeLevel'],
        properties: {
          userId: { type: 'number', example: 1 },
          privilegeLevel: { $ref: '#/components/schemas/PrivilegeLevel' },
        },
      },
      UpdateAdminInput: {
        type: 'object',
        properties: {
          userId: { type: 'number', example: 1 },
          privilegeLevel: { $ref: '#/components/schemas/PrivilegeLevel' },
        },
      },

      // ADDRESS SCHEMAS
      Province: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          code: { type: 'number', example: 1 },
          name: { type: 'string', example: 'Metro Manila' },
        },
      },
      City: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          code: { type: 'number', example: 101 },
          name: { type: 'string', example: 'Quezon City' },
          provinceId: { type: 'number', example: 1 },
        },
      },
      Barangay: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          code: { type: 'number', example: 10101 },
          name: { type: 'string', example: 'Barangay 1' },
          provinceId: { type: 'number', example: 1 },
          cityId: { type: 'number', example: 1 },
          leaderboardRank: { type: 'number', example: 1, nullable: true },
          totalDisposed: { type: 'number', example: 100, nullable: true },
        },
      },
      Address: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          street: { type: 'string', example: '123 Main St' },
          provinceId: { type: 'number', example: 1 },
          cityId: { type: 'number', example: 1 },
          barangayId: { type: 'number', example: 1 },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          deletedAt: { type: 'string', format: 'date-time', nullable: true },
          province: { $ref: '#/components/schemas/Province' },
          city: { $ref: '#/components/schemas/City' },
          barangay: { $ref: '#/components/schemas/Barangay' },
        },
      },
      CreateAddressInput: {
        type: 'object',
        required: ['street', 'provinceId', 'cityId', 'barangayId'],
        properties: {
          street: { type: 'string', example: '123 Main St' },
          provinceId: { type: 'number', example: 1 },
          cityId: { type: 'number', example: 1 },
          barangayId: { type: 'number', example: 1 },
        },
      },
      UpdateAddressInput: {
        type: 'object',
        properties: {
          street: { type: 'string', example: '123 Main St' },
          provinceId: { type: 'number', example: 1 },
          cityId: { type: 'number', example: 1 },
          barangayId: { type: 'number', example: 1 },
        },
      },

      // CIVILIAN SCHEMAS
      Civilian: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          userId: { type: 'number', example: 1 },
          addressId: { type: 'number', example: 1 },
          level: { type: 'number', example: 5 },
          exp: { type: 'number', example: 250 },
          streak: { type: 'number', example: 7 },
          leaderboardRank: { type: 'number', example: 10, nullable: true },
          totalVolumeDisposed: { type: 'number', format: 'double', example: 25.5 },
          points: { type: 'number', format: 'double', example: 150.0 },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          deletedAt: { type: 'string', format: 'date-time', nullable: true },
          user: { $ref: '#/components/schemas/User' },
          address: { $ref: '#/components/schemas/Address' },
        },
      },
      CreateCivilianInput: {
        type: 'object',
        required: ['userId', 'addressId', 'level', 'exp', 'streak', 'totalVolumeDisposed', 'points'],
        properties: {
          userId: { type: 'number', example: 1 },
          addressId: { type: 'number', example: 1 },
          level: { type: 'number', example: 1 },
          exp: { type: 'number', example: 0 },
          streak: { type: 'number', example: 0 },
          leaderboardRank: { type: 'number', example: null, nullable: true },
          totalVolumeDisposed: { type: 'number', format: 'double', example: 0.0 },
          points: { type: 'number', format: 'double', example: 0.0 },
        },
      },
      UpdateCivilianInput: {
        type: 'object',
        properties: {
          userId: { type: 'number', example: 1 },
          addressId: { type: 'number', example: 1 },
          level: { type: 'number', example: 5 },
          exp: { type: 'number', example: 250 },
          streak: { type: 'number', example: 7 },
          leaderboardRank: { type: 'number', example: 10, nullable: true },
          totalVolumeDisposed: { type: 'number', format: 'double', example: 25.5 },
          points: { type: 'number', format: 'double', example: 150.0 },
        },
      },

      // TRUCK SCHEMAS
      Truck: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          plateNumber: { type: 'string', example: 'ABC-123' },
          active: { type: 'boolean', example: true },
          userId: { type: 'number', example: 1 },
          totalCollectedVolume: { type: 'number', format: 'double', example: 500.75 },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          deletedAt: { type: 'string', format: 'date-time', nullable: true },
        },
      },
      CreateTruckInput: {
        type: 'object',
        required: ['plateNumber', 'active', 'userId', 'totalCollectedVolume'],
        properties: {
          plateNumber: { type: 'string', example: 'ABC-123' },
          active: { type: 'boolean', example: true },
          userId: { type: 'number', example: 1 },
          totalCollectedVolume: { type: 'number', format: 'double', example: 0.0 },
        },
      },
      UpdateTruckInput: {
        type: 'object',
        properties: {
          plateNumber: { type: 'string', example: 'ABC-123' },
          active: { type: 'boolean', example: true },
          userId: { type: 'number', example: 1 },
          totalCollectedVolume: { type: 'number', format: 'double', example: 500.75 },
        },
      },

      // LOCATION SCHEMAS
      Location: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          latitude: { type: 'string', example: '14.6507' },
          longitude: { type: 'string', example: '121.1029' },
          truckId: { type: 'number', example: 1 },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          deletedAt: { type: 'string', format: 'date-time', nullable: true },
        },
      },
      CreateLocationInput: {
        type: 'object',
        required: ['latitude', 'longitude', 'truckId'],
        properties: {
          latitude: { type: 'string', example: '14.6507' },
          longitude: { type: 'string', example: '121.1029' },
          truckId: { type: 'number', example: 1 },
        },
      },
      UpdateLocationInput: {
        type: 'object',
        properties: {
          latitude: { type: 'string', example: '14.6507' },
          longitude: { type: 'string', example: '121.1029' },
          truckId: { type: 'number', example: 1 },
        },
      },

      // TRUCK ROUTE SCHEMAS
      TruckRoute: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          truckId: { type: 'number', example: 1 },
          route: { type: 'string', example: 'LINESTRING(121.1029 14.6507, 121.1030 14.6508)' },
          validFrom: { type: 'string', format: 'date-time' },
          validTo: { type: 'string', format: 'date-time' },
        },
      },
      CreateTruckRouteInput: {
        type: 'object',
        required: ['truckId', 'route', 'validFrom', 'validTo'],
        properties: {
          truckId: { type: 'number', example: 1 },
          route: { type: 'string', example: 'LINESTRING(121.1029 14.6507, 121.1030 14.6508)' },
          validFrom: { type: 'string', format: 'date-time' },
          validTo: { type: 'string', format: 'date-time' },
        },
      },
      UpdateTruckRouteInput: {
        type: 'object',
        properties: {
          truckId: { type: 'number', example: 1 },
          route: { type: 'string', example: 'LINESTRING(121.1029 14.6507, 121.1030 14.6508)' },
          validFrom: { type: 'string', format: 'date-time' },
          validTo: { type: 'string', format: 'date-time' },
        },
      },

      // TRASH RECORD SCHEMAS
      TrashRecord: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          civilianId: { type: 'number', example: 1 },
          volume: { type: 'number', format: 'double', example: 2.5 },
          segregationScore: { type: 'number', format: 'double', example: 8.5 },
          recyclingScore: { type: 'number', format: 'double', example: 7.2 },
          wasteType: { $ref: '#/components/schemas/WasteType' },
          collected: { type: 'boolean', example: false },
          dateDisposed: { type: 'string', format: 'date-time' },
          dateCollected: { type: 'string', format: 'date-time', nullable: true },
          collectorId: { type: 'number', example: 1, nullable: true },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          deletedAt: { type: 'string', format: 'date-time', nullable: true },
        },
      },
      CreateTrashRecordInput: {
        type: 'object',
        required: ['civilianId', 'volume', 'segregationScore', 'recyclingScore', 'wasteType', 'collected', 'dateDisposed'],
        properties: {
          civilianId: { type: 'number', example: 1 },
          volume: { type: 'number', format: 'double', example: 2.5 },
          segregationScore: { type: 'number', format: 'double', example: 8.5 },
          recyclingScore: { type: 'number', format: 'double', example: 7.2 },
          wasteType: { $ref: '#/components/schemas/WasteType' },
          collected: { type: 'boolean', example: false },
          dateDisposed: { type: 'string', format: 'date-time' },
          dateCollected: { type: 'string', format: 'date-time', nullable: true },
          collectorId: { type: 'number', example: 1, nullable: true },
        },
      },
      UpdateTrashRecordInput: {
        type: 'object',
        properties: {
          civilianId: { type: 'number', example: 1 },
          volume: { type: 'number', format: 'double', example: 2.5 },
          segregationScore: { type: 'number', format: 'double', example: 8.5 },
          recyclingScore: { type: 'number', format: 'double', example: 7.2 },
          wasteType: { $ref: '#/components/schemas/WasteType' },
          collected: { type: 'boolean', example: true },
          dateDisposed: { type: 'string', format: 'date-time' },
          dateCollected: { type: 'string', format: 'date-time', nullable: true },
          collectorId: { type: 'number', example: 1, nullable: true },
        },
      },

      // SENSOR SCHEMAS
      Sensor: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          activeStatus: { type: 'boolean', example: true },
          barangayId: { type: 'number', example: 1 },
          sensorType: { $ref: '#/components/schemas/SensorType' },
        },
      },
      CreateSensorInput: {
        type: 'object',
        required: ['activeStatus', 'barangayId', 'sensorType'],
        properties: {
          activeStatus: { type: 'boolean', example: true },
          barangayId: { type: 'number', example: 1 },
          sensorType: { $ref: '#/components/schemas/SensorType' },
        },
      },
      UpdateSensorInput: {
        type: 'object',
        properties: {
          activeStatus: { type: 'boolean', example: true },
          barangayId: { type: 'number', example: 1 },
          sensorType: { $ref: '#/components/schemas/SensorType' },
        },
      },

      // SENSOR DATA SCHEMAS
      SensorData: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          sensorId: { type: 'number', example: 1 },
          ph: { type: 'number', format: 'double', example: 7.2 },
          tds: { type: 'number', format: 'double', example: 150.0 },
          dissolvedOxygen: { type: 'number', format: 'double', example: 8.5 },
          turbidity: { type: 'number', format: 'double', example: 2.1 },
          orp: { type: 'number', format: 'double', example: 200.0 },
          electricalConductivity: { type: 'number', format: 'double', example: 300.0 },
          connectionMode: { $ref: '#/components/schemas/ConnectionMode' },
          createdAt: { type: 'string', format: 'date-time' },
          deletedAt: { type: 'string', format: 'date-time', nullable: true },
        },
      },
      CreateSensorDataInput: {
        type: 'object',
        required: ['sensorId', 'ph', 'tds', 'dissolvedOxygen', 'turbidity', 'orp', 'electricalConductivity', 'connectionMode'],
        properties: {
          sensorId: { type: 'number', example: 1 },
          ph: { type: 'number', format: 'double', example: 7.2 },
          tds: { type: 'number', format: 'double', example: 150.0 },
          dissolvedOxygen: { type: 'number', format: 'double', example: 8.5 },
          turbidity: { type: 'number', format: 'double', example: 2.1 },
          orp: { type: 'number', format: 'double', example: 200.0 },
          electricalConductivity: { type: 'number', format: 'double', example: 300.0 },
          connectionMode: { $ref: '#/components/schemas/ConnectionMode' },
        },
      },
      UpdateSensorDataInput: {
        type: 'object',
        properties: {
          sensorId: { type: 'number', example: 1 },
          ph: { type: 'number', format: 'double', example: 7.2 },
          tds: { type: 'number', format: 'double', example: 150.0 },
          dissolvedOxygen: { type: 'number', format: 'double', example: 8.5 },
          turbidity: { type: 'number', format: 'double', example: 2.1 },
          orp: { type: 'number', format: 'double', example: 200.0 },
          electricalConductivity: { type: 'number', format: 'double', example: 300.0 },
          connectionMode: { $ref: '#/components/schemas/ConnectionMode' },
        },
      },

      // TRASH STATISTICS SCHEMAS
      TrashStatistics: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          type: { $ref: '#/components/schemas/StatisticsType' },
          entityId: { type: 'number', example: 1 },
          leaderboardRank: { type: 'number', example: 1 },
          totalDisposed: { type: 'number', format: 'double', example: 250.5 },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
          deletedAt: { type: 'string', format: 'date-time', nullable: true },
        },
      },
      CreateTrashStatisticsInput: {
        type: 'object',
        required: ['type', 'entityId', 'leaderboardRank', 'totalDisposed'],
        properties: {
          type: { $ref: '#/components/schemas/StatisticsType' },
          entityId: { type: 'number', example: 1 },
          leaderboardRank: { type: 'number', example: 1 },
          totalDisposed: { type: 'number', format: 'double', example: 250.5 },
        },
      },
      UpdateTrashStatisticsInput: {
        type: 'object',
        properties: {
          type: { $ref: '#/components/schemas/StatisticsType' },
          entityId: { type: 'number', example: 1 },
          leaderboardRank: { type: 'number', example: 1 },
          totalDisposed: { type: 'number', format: 'double', example: 250.5 },
        },
      },

      // WATER QUALITY STATISTICS SCHEMAS
      WaterQualityStatistics: {
        type: 'object',
        properties: {
          interval: { $ref: '#/components/schemas/IntervalType' },
          startDate: { type: 'string', format: 'date' },
          sensorId: { type: 'number', example: 1 },
          avePh: { type: 'number', format: 'double', example: 7.2 },
          aveTds: { type: 'number', format: 'double', example: 150.0 },
          aveDissolvedOxygen: { type: 'number', format: 'double', example: 8.5 },
          aveTurbidity: { type: 'number', format: 'double', example: 2.1 },
          aveOrp: { type: 'number', format: 'double', example: 200.0 },
          aveElectricalConductivity: { type: 'number', format: 'double', example: 300.0 },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      CreateWaterQualityStatisticsInput: {
        type: 'object',
        required: ['interval', 'startDate', 'sensorId', 'avePh', 'aveTds', 'aveDissolvedOxygen', 'aveTurbidity', 'aveOrp', 'aveElectricalConductivity'],
        properties: {
          interval: { $ref: '#/components/schemas/IntervalType' },
          startDate: { type: 'string', format: 'date' },
          sensorId: { type: 'number', example: 1 },
          avePh: { type: 'number', format: 'double', example: 7.2 },
          aveTds: { type: 'number', format: 'double', example: 150.0 },
          aveDissolvedOxygen: { type: 'number', format: 'double', example: 8.5 },
          aveTurbidity: { type: 'number', format: 'double', example: 2.1 },
          aveOrp: { type: 'number', format: 'double', example: 200.0 },
          aveElectricalConductivity: { type: 'number', format: 'double', example: 300.0 },
        },
      },
      UpdateWaterQualityStatisticsInput: {
        type: 'object',
        properties: {
          sensorId: { type: 'number', example: 1 },
          avePh: { type: 'number', format: 'double', example: 7.2 },
          aveTds: { type: 'number', format: 'double', example: 150.0 },
          aveDissolvedOxygen: { type: 'number', format: 'double', example: 8.5 },
          aveTurbidity: { type: 'number', format: 'double', example: 2.1 },
          aveOrp: { type: 'number', format: 'double', example: 200.0 },
          aveElectricalConductivity: { type: 'number', format: 'double', example: 300.0 },
        },
      },

      // COLLECTION SCHEDULE SCHEMAS
      CollectionSchedule: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          barangayId: { type: 'number', example: 1 },
          collectionDate: { type: 'string', format: 'date' },
          collectionTime: { type: 'string', example: '08:00:00' },
        },
      },
      CreateCollectionScheduleInput: {
        type: 'object',
        required: ['barangayId', 'collectionDate', 'collectionTime'],
        properties: {
          barangayId: { type: 'number', example: 1 },
          collectionDate: { type: 'string', format: 'date' },
          collectionTime: { type: 'string', example: '08:00:00' },
        },
      },
      UpdateCollectionScheduleInput: {
        type: 'object',
        properties: {
          barangayId: { type: 'number', example: 1 },
          collectionDate: { type: 'string', format: 'date' },
          collectionTime: { type: 'string', example: '08:00:00' },
        },
      },

      // REWARD MULTIPLIERS SCHEMAS
      RewardMultipliers: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          barangayId: { type: 'number', example: 1 },
          interval: { $ref: '#/components/schemas/IntervalType' },
          startDate: { type: 'string', format: 'date' },
          endDate: { type: 'string', format: 'date' },
          multiplierExp: { type: 'number', format: 'double', example: 1.5 },
          multiplierPoints: { type: 'number', format: 'double', example: 2.0 },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
      CreateRewardMultipliersInput: {
        type: 'object',
        required: ['barangayId', 'interval', 'startDate', 'endDate', 'multiplierExp', 'multiplierPoints'],
        properties: {
          barangayId: { type: 'number', example: 1 },
          interval: { $ref: '#/components/schemas/IntervalType' },
          startDate: { type: 'string', format: 'date' },
          endDate: { type: 'string', format: 'date' },
          multiplierExp: { type: 'number', format: 'double', example: 1.5 },
          multiplierPoints: { type: 'number', format: 'double', example: 2.0 },
        },
      },
      UpdateRewardMultipliersInput: {
        type: 'object',
        properties: {
          barangayId: { type: 'number', example: 1 },
          interval: { $ref: '#/components/schemas/IntervalType' },
          startDate: { type: 'string', format: 'date' },
          endDate: { type: 'string', format: 'date' },
          multiplierExp: { type: 'number', format: 'double', example: 1.5 },
          multiplierPoints: { type: 'number', format: 'double', example: 2.0 },
        },
      },

      // ERROR RESPONSE SCHEMA
      ErrorResponse: {
        type: 'object',
        properties: {
          name: { type: 'string', example: 'NotFoundError' },
          message: { type: 'string', example: 'Resource not found' },
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