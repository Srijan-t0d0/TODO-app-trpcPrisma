import { User as PrismaUser, User } from "@prisma/client";
import { prisma } from "./todoServices";

export const userServices = {
  createUser: async (data: Omit<User, "id">) => {
    const newUser = await prisma.user.create({ data });
    return newUser;
  },

  getUserById: async (userId: number) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  },
  getUserByUsername: async (userName: string) => {
    const user = await prisma.user.findUnique({
      where: {
        username: userName,
      },
    });
    return user;
  },
};
