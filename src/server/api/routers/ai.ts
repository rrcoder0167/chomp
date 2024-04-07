import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const aiRouter = createTRPCRouter({
  ai: protectedProcedure.input(z.string()).query(() => {
    return {};
  }),
});
