import { FastifyInstance } from 'fastify';
import { AuthController } from '../controllers/authController';

export async function authRoutes(fastify: FastifyInstance) {
  const authController = new AuthController();

  // Register endpoint
  fastify.post('/register', authController.register.bind(authController));

  // Login endpoint
  fastify.post('/login', authController.login.bind(authController));

  // Forgot password endpoint
  fastify.post('/forgot-password', authController.forgotPassword.bind(authController));

  // Reset password endpoint
  fastify.post('/reset-password', authController.resetPassword.bind(authController));

  // Refresh token endpoint
  fastify.post('/refresh-token', authController.refreshToken.bind(authController));
}