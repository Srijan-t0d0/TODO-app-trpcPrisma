import { middleware, publicProcedure, router } from "./trpc";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";

const isLoggedIn = middleware(async (opts) => {
  if (!opts.ctx.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return opts.next({
    ctx: {
      userId: opts.ctx.userId,
    },
  });
});

const TodoInputType = z.object({
  title: z.string(),
  description: z.string(),
});

export const appRouter = router({
  getTodo: publicProcedure.use(isLoggedIn).query((opts) => {
    return opts.ctx.todoService.getAllUserTodos(opts.ctx.userId);
  }),
  createTodo: publicProcedure
    .use(isLoggedIn)
    .input(TodoInputType)
    .mutation(async (opts) => {
      const title = opts.input.title;
      const description = opts.input.description;
      const authorId = opts.ctx.userId;
      const dbRes = await opts.ctx.todoService.createTodo({
        title,
        description,
        authorId,
      });
      console.log(dbRes);

      return dbRes;
    }),
  signUp: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async (opts) => {
      //check if the username is taken
      let username = opts.input.username;
      let password = opts.input.password;
      let createdUser = await opts.ctx.userServices.createUser({
        username,
        password,
      });
      return createdUser;
    }),

  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async (opts) => {
      const { username, password } = opts.input;

      const user = await opts.ctx.userServices.getUserByUsername(username);

      if (!user || user.password !== password) {
        throw new Error("Invalid username or password");
      }

      const token = jwt.sign({ userId: user.id }, "your-secret-key", {
        expiresIn: "1h",
      });

      return { token };
    }),
});

export type AppRouter = typeof appRouter;
