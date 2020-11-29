import { $enum } from "ts-enum-util";
import { Generation } from "enums";
import { Color, Filter } from "types";

export const DEFAULT_GENERATION_FILTER = "All Generations";

export function getGenerationName(generation: Generation): string {
  return $enum.mapValue(generation).with({
    [Generation.GEN_1]: "Generation I",
    [Generation.GEN_2]: "Generation II",
    [Generation.GEN_3]: "Generation III",
    [Generation.GEN_4]: "Generation IV",
    [Generation.GEN_5]: "Generation V",
    [Generation.GEN_6]: "Generation VI",
    [Generation.GEN_7]: "Generation VII",
    [Generation.GEN_8]: "Generation VIII",
  });
}

export function getGenerationShortenedName(generation: Generation): string {
  return $enum.mapValue(generation).with({
    [Generation.GEN_1]: "Gen I",
    [Generation.GEN_2]: "Gen II",
    [Generation.GEN_3]: "Gen III",
    [Generation.GEN_4]: "Gen IV",
    [Generation.GEN_5]: "Gen V",
    [Generation.GEN_6]: "Gen VI",
    [Generation.GEN_7]: "Gen VII",
    [Generation.GEN_8]: "Gen VIII",
  });
}

export function getGenerationColor(): Color {
  return {
    text: "#6e7a8a",
    background: "#ccd4db",
  };
}

const generationNameMap: Map<string, Generation> = new Map<
  string,
  Generation
>();
(function populateGenerationNameMap() {
  $enum(Generation).forEach((generation) => {
    const name = getGenerationName(generation);
    const shortenedName = getGenerationShortenedName(generation);
    generationNameMap.set(name, generation);
    generationNameMap.set(shortenedName, generation);
  });
})();

export function getGeneration(generationName: string): Generation | undefined {
  return generationNameMap.get(generationName);
}

export const GenerationFilter: Filter<Generation> = class {
  public static getName(): string {
    return "Generations";
  }

  public static getValueName(generation: Generation): string {
    return getGenerationName(generation);
  }

  public static getValues(): string[] {
    return [
      DEFAULT_GENERATION_FILTER,
      ...$enum(Generation).getValues().map(getGenerationName),
    ];
  }

  public static getDefaultValue(): string {
    return DEFAULT_GENERATION_FILTER;
  }

  public static getTypeFromValue(value: string): Generation | undefined {
    return generationNameMap.get(value);
  }
};
