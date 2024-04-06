type Mode = "fasting" | "afterEating" | "2+ hours afterEating";
type BloodSugarUnit = "mg/dL" | "mmol/L";

export function rankBloodSugar(
  mode: Mode,
  unit: BloodSugarUnit,
  bloodSugar: number,
) {
  if (unit === "mmol/L") {
    bloodSugar = bloodSugar * 18;
  }
  switch (true) {
    case bloodSugar >= 80 && bloodSugar < 101 && mode === "fasting":
      return "healthy";
    case bloodSugar >= 101 && bloodSugar < 126 && mode === "fasting":
      return "pre-diabetic";
    case bloodSugar >= 126 && mode === "fasting":
      return "diabetic";

    case bloodSugar >= 170 && bloodSugar < 201 && mode === "afterEating":
      return "healthy";
    case bloodSugar >= 201 && bloodSugar <= 230 && mode === "afterEating":
      return "pre-diabetic";
    case bloodSugar >= 230 && bloodSugar <= 300 && mode === "afterEating":
      return "diabetic";

    case bloodSugar >= 120 &&
      bloodSugar < 140 &&
      mode === "2+ hours afterEating":
      return "healthy";
    case bloodSugar >= 140 &&
      bloodSugar < 160 &&
      mode === "2+ hours afterEating":
      return "pre-diabetic";
    case bloodSugar >= 160 && mode === "2+ hours afterEating":
      return "diabetic";
  }
}
