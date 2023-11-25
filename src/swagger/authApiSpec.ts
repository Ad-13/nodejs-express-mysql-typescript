export default {
  '/api/auth/registration': {
    post: {
      summary: 'Register a new user',
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            example: {
              email: 'user@example.com',
              password: 'password123',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'User registration successful',
          content: {
            'application/json': {
              example: {
                accessToken: '...',
                refreshToken: '...',
                user: {
                  id: 1,
                  email: 'user@example.com',
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/auth/login': {
    post: {
      summary: 'Login with existing credentials',
      tags: ['Authentication'],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            example: {
              email: 'user@example.com',
              password: 'password123',
            },
          },
        },
      },
      responses: {
        '200': {
          description: 'Login successful',
          content: {
            'application/json': {
              example: {
                accessToken: '...',
                refreshToken: '...',
                user: {
                  id: 1,
                  email: 'user@example.com',
                },
              },
            },
          },
        },
      },
    },
  },
  '/api/auth/logout': {
    post: {
      summary: 'Logout the current user',
      tags: ['Authentication'],
      responses: {
        '200': {
          description: 'Logout successful',
        },
      },
    },
  },
  '/api/auth/activate/{link}': {
    get: {
      summary: 'Activate a user account',
      tags: ['Authentication'],
      parameters: [
        {
          name: 'link',
          in: 'path',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      responses: {
        '200': {
          description: 'Account activation successful',
        },
      },
    },
  },
  '/api/auth/refresh': {
    get: {
      summary: 'Refresh access token using refresh token',
      tags: ['Authentication'],
      responses: {
        '200': {
          description: 'Access token refreshed successfully',
          content: {
            'application/json': {
              example: {
                accessToken: '...',
              },
            },
          },
        },
      },
    },
  },
};
