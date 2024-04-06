import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const aiRouter = createTRPCRouter({
  ai: protectedProcedure.input(z.string()).query(({ input }) => {
    return {};
  }),
});
