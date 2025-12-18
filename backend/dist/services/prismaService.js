"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaService = void 0;
const client_1 = require("@prisma/client");
class PrismaService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    get client() {
        return this.prisma;
    }
    async connect() {
        try {
            await this.prisma.$connect();
            console.log('Connected to database');
        }
        catch (error) {
            console.error('Database connection error:', error);
            throw error;
        }
    }
    async disconnect() {
        await this.prisma.$disconnect();
    }
}
exports.prismaService = new PrismaService();
