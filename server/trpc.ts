import { initTRPC } from "@trpc/server";
import { todoService } from "../services/todoServices";
import { userServices } from "../services/userServices";

export interface MyContext {
  userId?: number;
  todoService: typeof todoService;
  userServices: typeof userServices;
}

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<MyContext>().create();
/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
