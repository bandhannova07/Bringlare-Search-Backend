"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const prismaService_1 = require("./prismaService");
class DatabaseService {
    async initialize() {
        await prismaService_1.prismaService.connect();
    }
    async createUser(userData) {
        try {
            const user = await prismaService_1.prismaService.client.user.create({
                data: userData,
            });
            return user;
        }
        catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
    async findUserByEmail(email) {
        try {
            const user = await prismaService_1.prismaService.client.user.findUnique({
                where: {
                    email,
                },
            });
            return user;
        }
        catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    }
    async findUserById(id) {
        try {
            const user = await prismaService_1.prismaService.client.user.findUnique({
                where: {
                    id,
                },
            });
            return user;
        }
        catch (error) {
            console.error('Error finding user by ID:', error);
            throw error;
        }
    }
    async updateUser(id, userData) {
        try {
            const user = await prismaService_1.prismaService.client.user.update({
                where: {
                    id,
                },
                data: userData,
            });
            return user;
        }
        catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
}
exports.DatabaseService = DatabaseService;
