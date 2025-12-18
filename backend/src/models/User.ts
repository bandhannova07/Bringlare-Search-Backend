export interface User {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  avatar?: string;
  country: string;
  email: string;
  password: string;
  phoneNumber: string;
  privacyPolicyAccepted: boolean;
  termsAndConditionsAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: Date;
  gender: string;
  avatar?: string;
  country: string;
  email: string;
  password: string;
  phoneNumber: string;
  privacyPolicyAccepted: boolean;
  termsAndConditionsAccepted: boolean;
}