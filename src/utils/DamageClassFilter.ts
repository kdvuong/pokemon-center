import { $enum } from "ts-enum-util";
import { DamageClass } from "shared/enums";
import { Filter } from "shared/interfaces";

export function getDamageClassName(damageClass: DamageClass): string {
  return $enum.mapValue(damageClass).with({
    [DamageClass.PHYSICAL]: "Physical",
    [DamageClass.SPECIAL]: "Special",
    [DamageClass.STATUS]: "Status",
  });
}

const damageClassNameMap: Map<string, DamageClass> = new Map<string, DamageClass>();
(function populateTypeNameMap() {
  $enum(DamageClass).forEach((damageClass) => {
    damageClassNameMap.set(getDamageClassName(damageClass), damageClass);
  });
})();

export const DamageClassFilter: Filter<DamageClass> = class {
  private static DEFAULT_VALUE: string = "All Categories";

  public static getName(): string {
    return "Category";
  }

  public static getValueName(damageClass: DamageClass | null): string {
    if (damageClass === null) {
      return this.DEFAULT_VALUE;
    }
    return getDamageClassName(damageClass);
  }

  public static getValues(): string[] {
    return [this.DEFAULT_VALUE, ...$enum(DamageClass).getValues().map(getDamageClassName)];
  }

  public static getTypeFromValue(value: string): DamageClass | undefined {
    return damageClassNameMap.get(value);
  }

  public static getBackgroundColor(damageClass: DamageClass | null): string {
    return "white";
  }
};
