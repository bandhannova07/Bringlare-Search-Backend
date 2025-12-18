"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
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
        return bcryptjs_1.default.hash(password, saltRounds);
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
        return bcryptjs_1.default.compare(plainPassword, hashedPassword);
    }
    // Update user
    async updateUser(id, userData) {
        return this.databaseService.updateUser(id, userData);
    }
}
exports.UserService = UserService;
