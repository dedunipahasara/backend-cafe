// src/models/userModel.ts

import { User } from '@prisma/client';

// You can create an interface for type checking if you want.
export interface UserModel extends User {}

// Explanation:
// 1. Prisma handles the model definition in prisma/schema.prisma.
// 2. We import the User type from @prisma/client.
// 3. We create an interface UserModel that extends the Prisma User type.
// 4. This interface is for type checking in your application.
// 5. No need to define a schema or create a model with Prisma in this file.

// Usage example in a service or controller:
// import prisma from '../config/database';
// import { UserModel } from '../models/userModel';

// async function getUser(userId: number): Promise<UserModel | null> {
//   return prisma.user.findUnique({ where: { id: userId } });
// }
//
// async function createUser(userData: Omit<UserModel, 'id'>): Promise<UserModel> {
//   return prisma.user.create({ data: userData });
// }