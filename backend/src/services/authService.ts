import { UserService } from './userService';
import * as jwt from 'jsonwebtoken';

export class AuthService {
  private userService: UserService;
  private jwtSecret: string;
  private refreshTokenSecret: string;

  constructor() {
    this.userService = new UserService();
    this.jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';
    this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'default_refresh_token_secret';
  }

  // Generate JWT token
  generateToken(payload: any): string {
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '15m' });
  }

  // Generate refresh token
  generateRefreshToken(payload: any): string {
    return jwt.sign(payload, this.refreshTokenSecret, { expiresIn: '7d' });
  }

  // Validate JWT token
  validateToken(token: string): { valid: boolean; payload: any | null } {
    try {
      const payload = jwt.verify(token, this.jwtSecret);
      return { valid: true, payload };
    } catch (error) {
      return { valid: false, payload: null };
    }
  }

  // Validate refresh token
  validateRefreshToken(refreshToken: string): { valid: boolean; payload: any | null } {
    try {
      const payload = jwt.verify(refreshToken, this.refreshTokenSecret);
      return { valid: true, payload };
    } catch (error) {
      return { valid: false, payload: null };
    }
  }

  // Refresh access token using refresh token
  refreshAccessToken(refreshToken: string): { accessToken: string | null; error: string | null } {
    const validation = this.validateRefreshToken(refreshToken);
    
    if (!validation.valid) {
      return { accessToken: null, error: 'Invalid refresh token' };
    }

    const newAccessToken = this.generateToken(validation.payload);
    return { accessToken: newAccessToken, error: null };
  }
}