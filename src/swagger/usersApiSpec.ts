export default {
  '/api/users': {
    get: {
      summary: 'Get all users',
      tags: ['Users'],
      responses: {
        '200': {
          description: 'A successful response',
          content: {
            'application/json': {
              example: [
                { id: 1, name: 'John Doe' },
                { id: 2, name: 'Jane Doe' },
              ],
            },
          },
        },
      },
    },
    post: {
      summary: 'Create a new user',
      tags: ['Users'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            example: { name: 'New User' },
          },
        },
      },
      responses: {
        '201': {
          description: 'User created successfully',
          content: {
            'application/json': {
              example: { id: 3, name: 'New User' },
            },
          },
        },
      },
    },
  },
  '/api/users/{id}': {
    get: {
      summary: 'Get user by ID',
      tags: ['Users'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID of the user to retrieve',
          required: true,
          schema: {
            type: 'integer',
          },
        },
      ],
      responses: {
        '200': {
          description: 'User found',
          content: {
            'application/json': {
              example: { id: 1, name: 'John Doe' },
            },
          },
        },
        '404': {
          description: 'User not found',
        },
      },
    },
    put: {
      summary: 'Update user by ID',
      tags: ['Users'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID of the user to update',
          required: true,
          schema: {
            type: 'integer',
          },
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            example: { name: 'Updated User' },
          },
        },
      },
      responses: {
        '200': {
          description: 'User updated successfully',
          content: {
            'application/json': {
              example: { id: 1, name: 'Updated User' },
            },
          },
        },
        '404': {
          description: 'User not found',
        },
      },
    },
    delete: {
      summary: 'Delete user by ID',
      tags: ['Users'],
      parameters: [
        {
          name: 'id',
          in: 'path',
          description: 'ID of the user to delete',
          required: true,
          schema: {
            type: 'integer',
          },
        },
      ],
      responses: {
        '200': {
          description: 'User deleted successfully',
          content: {
            'application/json': {
              example: { id: 1 },
            },
          },
        },
        '404': {
          description: 'User not found',
        },
      },
    },
  },
};
