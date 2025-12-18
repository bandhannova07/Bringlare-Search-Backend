"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const userService_1 = require("../services/userService");
const authService_1 = require("../services/authService");
const passkeyService_1 = require("../services/passkeyService");
class AuthController {
    constructor() {
        this.userService = new userService_1.UserService();
        this.authService = new authService_1.AuthService();
        this.passkeyService = new passkeyService_1.PasskeyService();
    }
    // Register a new user
    async register(request, reply) {
        try {
            const userData = request.body;
            // Check if user already exists
            const existingUser = await this.userService.findUserByEmail(userData.email);
            if (existingUser) {
                return reply.status(400).send({ error: 'User with this email already exists' });
            }
            // Validate required fields
            if (!userData.privacyPolicyAccepted || !userData.termsAndConditionsAccepted) {
                return reply.status(400).send({ error: 'Privacy policy and terms & conditions must be accepted' });
            }
            // Create user
            const newUser = await this.userService.createUser(userData);
            // Generate tokens
            const token = this.authService.generateToken({ userId: newUser.id });
            const refreshToken = this.authService.generateRefreshToken({ userId: newUser.id });
            // Return user data without password
            const { password, ...userWithoutPassword } = newUser;
            return reply.status(201).send({
                user: userWithoutPassword,
                token,
                refreshToken
            });
        }
        catch (error) {
            console.error('Registration error:', error);
            return reply.status(500).send({ error: error.message || 'Internal server error' });
        }
    }
    // Login user
    async login(request, reply) {
        try {
            const { email, password } = request.body;
            // Find user
            const user = await this.userService.findUserByEmail(email);
            if (!user) {
                return reply.status(401).send({ error: 'Invalid credentials' });
            }
            // Validate password
            const isValidPassword = await this.userService.validatePassword(password, user.password);
            if (!isValidPassword) {
                return reply.status(401).send({ error: 'Invalid credentials' });
            }
            // Generate tokens
            const token = this.authService.generateToken({ userId: user.id });
            const refreshToken = this.authService.generateRefreshToken({ userId: user.id });
            // Return user data without password
            const { password: _, ...userWithoutPassword } = user;
            return reply.send({
                user: userWithoutPassword,
                token,
                refreshToken
            });
        }
        catch (error) {
            console.error('Login error:', error);
            return reply.status(500).send({ error: error.message || 'Internal server error' });
        }
    }
    // Forgot password
    async forgotPassword(request, reply) {
        try {
            const { email } = request.body;
            // Find user
            const user = await this.userService.findUserByEmail(email);
            if (!user) {
                // We don't reveal if user exists or not for security reasons
                return reply.send({ message: 'If your email is registered, you will receive password reset instructions' });
            }
            // Generate passkey
            const passkey = this.passkeyService.generatePasskey();
            // Save passkey
            this.passkeyService.savePasskey(email, passkey);
            // Send passkey to user
            await this.passkeyService.sendPasskey(email, passkey);
            return reply.send({
                message: 'Passkey sent to your registered email/phone number',
                // In production, don't return the passkey in the response
                // passkey: passkey // Only for development/testing
            });
        }
        catch (error) {
            console.error('Forgot password error:', error);
            return reply.status(500).send({ error: error.message || 'Internal server error' });
        }
    }
    // Reset password with passkey
    async resetPassword(request, reply) {
        try {
            const { email, passkey, newPassword } = request.body;
            // Validate passkey
            const isValidPasskey = this.passkeyService.validatePasskey(email, passkey);
            if (!isValidPasskey) {
                return reply.status(400).send({ error: 'Invalid or expired passkey' });
            }
            // Hash new password
            const hashedPassword = await this.userService.hashPassword(newPassword);
            // Update user password
            const user = await this.userService.findUserByEmail(email);
            if (!user) {
                return reply.status(404).send({ error: 'User not found' });
            }
            await this.userService.updateUser(user.id, { password: hashedPassword });
            return reply.send({ message: 'Password successfully reset' });
        }
        catch (error) {
            console.error('Reset password error:', error);
            return reply.status(500).send({ error: error.message || 'Internal server error' });
        }
    }
    // Refresh access token
    async refreshToken(request, reply) {
        try {
            const { refreshToken } = request.body;
            const result = this.authService.refreshAccessToken(refreshToken);
            if (result.error) {
                return reply.status(401).send({ error: result.error });
            }
            return reply.send({ accessToken: result.accessToken });
        }
        catch (error) {
            console.error('Refresh token error:', error);
            return reply.status(500).send({ error: error.message || 'Internal server error' });
        }
    }
}
exports.AuthController = AuthController;
