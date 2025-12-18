import { PrismaClient } from '@prisma/client';

class PrismaService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  get client() {
    return this.prisma;
  }

  async connect() {
    try {
      await this.prisma.$connect();
      console.log('Connected to database');
    } catch (error) {
      console.error('Database connection error:', error);
      throw error;
    }
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }
}

export const prismaService = new PrismaService();