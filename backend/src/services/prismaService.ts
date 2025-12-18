import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prismaInstance = new PrismaClient({
  adapter,
});

class PrismaService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = prismaInstance;
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
    await pool.end();
  }
}

export const prismaService = new PrismaService();