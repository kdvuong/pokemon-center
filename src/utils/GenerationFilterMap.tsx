import { $enum } from "ts-enum-util";
import { GenerationFilter } from "enums";
import { Color } from "types";

export function getGenerationName(generation: GenerationFilter): string {
  return $enum.mapValue(generation).with({
    [GenerationFilter.DEFAULT]: "All Generations",
    [GenerationFilter.GEN_1]: "Generation I",
    [GenerationFilter.GEN_2]: "Generation II",
    [GenerationFilter.GEN_3]: "Generation III",
    [GenerationFilter.GEN_4]: "Generation IV",
    [GenerationFilter.GEN_5]: "Generation V",
    [GenerationFilter.GEN_6]: "Generation VI",
    [GenerationFilter.GEN_7]: "Generation VII",
    [GenerationFilter.GEN_8]: "Generation VIII",
  });
}

export function getGenerationShortenedName(
  generation: GenerationFilter
): string {
  return $enum.mapValue(generation).with({
    [GenerationFilter.DEFAULT]: "All Gens",
    [GenerationFilter.GEN_1]: "Gen I",
    [GenerationFilter.GEN_2]: "Gen II",
    [GenerationFilter.GEN_3]: "Gen III",
    [GenerationFilter.GEN_4]: "Gen IV",
    [GenerationFilter.GEN_5]: "Gen V",
    [GenerationFilter.GEN_6]: "Gen VI",
    [GenerationFilter.GEN_7]: "Gen VII",
    [GenerationFilter.GEN_8]: "Gen VIII",
  });
}

export function getGenerationColor(): Color {
  return {
    text: "#6e7a8a",
    background: "#ccd4db",
  };
}
