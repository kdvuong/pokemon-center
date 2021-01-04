import { $enum } from "ts-enum-util";
import { LearnType } from "enums";

export function getAllLearnTypeNames(): string[] {
  return $enum(LearnType).getValues().map(getLearnTypeName);
}

function getLearnTypeName(learnType: LearnType): string {
  return $enum.mapValue(learnType).with({
    [LearnType.EGG]: "egg",
    [LearnType.LEVEL_UP]: "level up",
    [LearnType.MACHINE]: "machine",
    [LearnType.TUTOR]: "tutor",
  });
}

const learnTypeNameMap: Map<string, LearnType> = new Map<string, LearnType>();
(function populateGenerationNameMap() {
  $enum(LearnType).forEach((learnType) => {
    const name = getLearnTypeName(learnType);
    learnTypeNameMap.set(name, learnType);
  });
})();

export function getLearnTypeFromName(name: string): LearnType {
  return learnTypeNameMap.get(name) ?? LearnType.LEVEL_UP;
}
