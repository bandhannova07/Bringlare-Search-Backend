"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const userService_1 = require("./userService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    constructor() {
        this.userService = new userService_1.UserService();
        this.jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';
        this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'default_refresh_token_secret';
    }
    // Generate JWT token
    generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.jwtSecret, { expiresIn: '15m' });
    }
    // Generate refresh token
    generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.refreshTokenSecret, { expiresIn: '7d' });
    }
    // Validate JWT token
    validateToken(token) {
        try {
            const payload = jsonwebtoken_1.default.verify(token, this.jwtSecret);
            return { valid: true, payload };
        }
        catch (error) {
            return { valid: false, payload: null };
        }
    }
    // Validate refresh token
    validateRefreshToken(refreshToken) {
        try {
            const payload = jsonwebtoken_1.default.verify(refreshToken, this.refreshTokenSecret);
            return { valid: true, payload };
        }
        catch (error) {
            return { valid: false, payload: null };
        }
    }
    // Refresh access token using refresh token
    refreshAccessToken(refreshToken) {
        const validation = this.validateRefreshToken(refreshToken);
        if (!validation.valid) {
            return { accessToken: null, error: 'Invalid refresh token' };
        }
        const newAccessToken = this.generateToken(validation.payload);
        return { accessToken: newAccessToken, error: null };
    }
}
exports.AuthService = AuthService;
