import usersApiSpec from './usersApiSpec';
import authApiSpec from './authApiSpec';

export default {
  openapi: '3.0.0',
  info: {
    title: 'AutoStore API Documentation',
    version: '1.0.0',
    description: 'RESTful API for managing users, sellers, clients, cars, and car parts.',
  },
  paths: {
    ...usersApiSpec,
    ...authApiSpec,
  },
};
