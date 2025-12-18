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
exports.DatabaseService = void 0;
const prismaService_1 = require("./prismaService");
const dotenv = __importStar(require("dotenv"));
// Load environment variables
dotenv.config();
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
