"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const userService_1 = require("./userService");
const jwt = __importStar(require("jsonwebtoken"));
class AuthService {
    constructor() {
        this.userService = new userService_1.UserService();
        this.jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';
        this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'default_refresh_token_secret';
    }
    // Generate JWT token
    generateToken(payload) {
        return jwt.sign(payload, this.jwtSecret, { expiresIn: '15m' });
    }
    // Generate refresh token
    generateRefreshToken(payload) {
        return jwt.sign(payload, this.refreshTokenSecret, { expiresIn: '7d' });
    }
    // Validate JWT token
    validateToken(token) {
        try {
            const payload = jwt.verify(token, this.jwtSecret);
            return { valid: true, payload };
        }
        catch (error) {
            return { valid: false, payload: null };
        }
    }
    // Validate refresh token
    validateRefreshToken(refreshToken) {
        try {
            const payload = jwt.verify(refreshToken, this.refreshTokenSecret);
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
