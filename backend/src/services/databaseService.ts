import { prismaService } from './prismaService';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export class DatabaseService {
  async initialize() {
    await prismaService.connect();
  }

  async createUser(userData: any): Promise<any> {
    try {
      const user = await prismaService.client.user.create({
        data: userData,
      });
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<any | null> {
    try {
      const user = await prismaService.client.user.findUnique({
        where: {
          email,
        },
      });
      return user;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  async findUserById(id: string): Promise<any | null> {
    try {
      const user = await prismaService.client.user.findUnique({
        where: {
          id,
        },
      });
      return user;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

  async updateUser(id: string, userData: any): Promise<any> {
    try {
      const user = await prismaService.client.user.update({
        where: {
          id,
        },
        data: userData,
      });
      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
}