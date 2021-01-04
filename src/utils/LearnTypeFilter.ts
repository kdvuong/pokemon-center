import { $enum } from "ts-enum-util";
import { LearnType } from "enums";

export function getAllLearnTypes(): string[] {
  return $enum(LearnType).getValues();
}
