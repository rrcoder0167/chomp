import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const onboardingRouter = createTRPCRouter({
  set: protectedProcedure.input(z.object({ name: z.string(), sugar: z.number(), date: z.date() })).mutation(async ({ input, ctx }) => {
      await ctx.db.user.update({
        where: {
            id: String(ctx.session.user.id)
        },
        data: {
            birthday: input.date,
            sugar_percentage: input.sugar,
            full_name: input.name,
            hasBeenOnboarded: true
        }
      })
      return "OK";
  }),
  onboardedBefore: protectedProcedure
    .query(async ({ ctx }) => {
        const user = await ctx.db.user.findUnique({
            where: {
                id: String(ctx.session.user.id)
            }
        })
        return user?.hasBeenOnboarded;
    })
});
