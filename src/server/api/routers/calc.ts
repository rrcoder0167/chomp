import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

// f = fasting
// a = after eating
// a2+ = 2+ hours after eating
type Mode = "f" | "a" | "a2+";

// g = mg/dL
// c = convert = mmol/L
type BloodSugarUnit = "g" | "c";

export function getBMI(weightLBs: number, heightINs: number) {
  return heightINs / weightLBs;
}

export function rankBloodSugar(
  mode: Mode,
  unit: BloodSugarUnit,
  bloodSugar: number,
) {
  if (unit === "c") {
    bloodSugar = bloodSugar * 18;
  }
  switch (true) {
    case bloodSugar >= 80 && bloodSugar < 101 && mode === "f":
      return "healthy";
    case bloodSugar >= 101 && bloodSugar < 126 && mode === "f":
      return "pre-diabetic";
    case bloodSugar >= 126 && mode === "f":
      return "diabetic";

    case bloodSugar >= 170 && bloodSugar < 201 && mode === "a":
      return "healthy";
    case bloodSugar >= 201 && bloodSugar <= 230 && mode === "a":
      return "pre-diabetic";
    case bloodSugar >= 230 && bloodSugar <= 300 && mode === "a":
      return "diabetic";

    case bloodSugar >= 120 && bloodSugar < 140 && mode === "a2+":
      return "healthy";
    case bloodSugar >= 140 && bloodSugar < 160 && mode === "a2+":
      return "pre-diabetic";
    case bloodSugar >= 160 && mode === "a2+":
      return "diabetic";
  }
}

export const calcRouter = createTRPCRouter({
  bmi: protectedProcedure
    .input(z.object({ height: z.number().int(), weight: z.number().int() }))
    .query(({ input }) => {
      if (input.weight <= 0 || input.height <= 0) {
        throw "Bad weight/height";
      }
      return getBMI(input.weight, input.height);
    }),
  bloodsugar: protectedProcedure
    .input(
      z.object({
        units: z.number().int(),
        sugar: z.number().int(),
        mode: z.string(),
      }),
    )
    .query(({ input }) => {
      // @ts-ignore
      return rankBloodSugar(input.mode, input.sugar, input.units);
    }),
});
