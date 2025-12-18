import bcrypt from 'bcryptjs';
import { DatabaseService } from './databaseService';
import { CreateUserInput } from '../models/User';

export class UserService {
  private databaseService: DatabaseService;

  constructor() {
    this.databaseService = new DatabaseService();
  }

  // Generate a unique Bringlare ID (xxxxx123@bringlare.com format)
  private generateBringlareId(firstName: string, lastName: string): string {
    const randomNumbers = Math.floor(100 + Math.random() * 900); // 3-digit random number
    return `${firstName.toLowerCase().substring(0, 3)}${lastName.toLowerCase().substring(0, 3)}${randomNumbers}@bringlare.com`;
  }

  // Hash password (public so it can be used by other services)
  public async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  // Create a new user
  async createUser(input: CreateUserInput): Promise<any> {
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
  async findUserByEmail(email: string): Promise<any | undefined> {
    return this.databaseService.findUserByEmail(email);
  }

  // Find user by Bringlare ID
  async findUserById(id: string): Promise<any | undefined> {
    return this.databaseService.findUserById(id);
  }

  // Validate password
  async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  // Update user
  async updateUser(id: string, userData: any): Promise<any> {
    return this.databaseService.updateUser(id, userData);
  }
}