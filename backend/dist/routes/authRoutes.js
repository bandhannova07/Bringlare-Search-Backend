"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = authRoutes;
const authController_1 = require("../controllers/authController");
async function authRoutes(fastify) {
    const authController = new authController_1.AuthController();
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
