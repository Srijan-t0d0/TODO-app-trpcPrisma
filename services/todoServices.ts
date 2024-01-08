// services/todoService.ts

import { PrismaClient, Todo as PrismaTodo } from "@prisma/client";

export const prisma = new PrismaClient();

interface Todo {
  title: string;
  description: string;
  completed?: boolean;
  authorId: number;
}

export const todoService = {
  getAllUserTodos: async (userId: number): Promise<PrismaTodo[]> => {
    return prisma.todo.findMany({
      where: {
        authorId: userId,
      },
    });
  },
  getTodoById: async (id: number): Promise<PrismaTodo | null> => {
    return prisma.todo.findUnique({
      where: {
        id,
      },
    });
  },
  createTodo: async (data: Todo) => {
    return prisma.todo.create({
      data: {
        compeleted: false,
        description: data.description,
        title: data.title,
        authorId: data.authorId,
      },
    });
  },
  updateTodo: async (
    id: number,
    data: Partial<Todo>
  ): Promise<PrismaTodo | null> => {
    return prisma.todo.update({
      where: {
        id,
      },
      data,
    });
  },
  deleteTodo: async (id: number): Promise<PrismaTodo | null> => {
    return prisma.todo.delete({
      where: {
        id,
      },
    });
  },
};
