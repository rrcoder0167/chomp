import { aiRouter } from "~/server/api/routers/ai";
import { calcRouter } from "~/server/api/routers/calc";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { onboardingRouter } from "./routers/onboarding";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ai: aiRouter,
  calc: calcRouter,
  onboarding: onboardingRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
