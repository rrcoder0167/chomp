"use client";

import { Input } from "~/components/ui/input";
import { useState } from "react";

export default function Home() {
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);

  const bmi = Math.round((weight / height) * 100) / 10;
  let weightStatus: Weight = "normal";
  if (bmi < 18.5) weightStatus = "underweight";
  else if (bmi < 25) weightStatus = "normal";
  else if (bmi < 30) weightStatus = "overweight";
  else weightStatus = "obese";

  type Weight = "normal" | "overweight" | "obese" | "underweight";

  function BmiDisplay() {
    if (weight > 0 && height > 0) {
      return (
        <p>
          Your BMI is {bmi}. That means that you are {weightStatus}.
        </p>
      );
    }
    return null;
  }

  return (
    <>
      <main className="space-y-3 p-4">
        <h1 className="text-4xl">BMI</h1>
        <Input
          type="number"
          placeholder="Height(Inches)"
          onChange={(e) => {
            setHeight(Number(e.target.value));
          }}
        />
        <Input
          type="number"
          placeholder="Weight(Pounds)"
          onChange={(e) => {
            setWeight(Number(e.target.value));
          }}
        />
        <BmiDisplay />
      </main>
    </>
  );
}
