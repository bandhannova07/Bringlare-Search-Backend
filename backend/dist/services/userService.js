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
exports.UserService = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const databaseService_1 = require("./databaseService");
class UserService {
    constructor() {
        this.databaseService = new databaseService_1.DatabaseService();
    }
    // Generate a unique Bringlare ID (xxxxx123@bringlare.com format)
    generateBringlareId(firstName, lastName) {
        const randomNumbers = Math.floor(100 + Math.random() * 900); // 3-digit random number
        return `${firstName.toLowerCase().substring(0, 3)}${lastName.toLowerCase().substring(0, 3)}${randomNumbers}@bringlare.com`;
    }
    // Hash password (public so it can be used by other services)
    async hashPassword(password) {
        const saltRounds = 10;
        return bcrypt.hash(password, saltRounds);
    }
    // Create a new user
    async createUser(input) {
        // Check if user already exists
        const existingUser = await this.databaseService.findUserByEmail(input.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        const hashedPassword = await this.hashPassword(input.password);
        const newUser = {
            firstName: input.firstName,
            middleName: input.middleName,
            lastName: input.lastName,
            dateOfBirth: input.dateOfBirth,
            gender: input.gender,
            avatar: input.avatar,
            country: input.country,
            email: input.email,
            password: hashedPassword,
            phoneNumber: input.phoneNumber,
            privacyPolicyAccepted: input.privacyPolicyAccepted,
            termsAndConditionsAccepted: input.termsAndConditionsAccepted,
        };
        const createdUser = await this.databaseService.createUser(newUser);
        return createdUser;
    }
    // Find user by email
    async findUserByEmail(email) {
        return this.databaseService.findUserByEmail(email);
    }
    // Find user by Bringlare ID
    async findUserById(id) {
        return this.databaseService.findUserById(id);
    }
    // Validate password
    async validatePassword(plainPassword, hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
    // Update user
    async updateUser(id, userData) {
        return this.databaseService.updateUser(id, userData);
    }
}
exports.UserService = UserService;
