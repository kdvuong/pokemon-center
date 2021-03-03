/* ./worker/worker.ts */

import { Generation, Type } from "shared/enums";
import { PokemonSummary } from "shared/interfaces";

export function filter(
  data: PokemonSummary[],
  searchValue: string,
  genFilter?: Generation | null,
  typeFilter?: Type | null
): PokemonSummary[] {
  // Process the data without stalling the UI
  if (!searchValue && !genFilter && !typeFilter) {
    return data;
  }

  return data.filter((pokemon) => {
    let searchValueMatched = searchValue
      ? pokemon.name.toLowerCase().startsWith(searchValue.toLowerCase())
      : true;
    let genFilterMatched = genFilter ? pokemon.generation === genFilter : true;
    let typeFilterMatched = typeFilter ? pokemon.types.includes(typeFilter) : true;

    return searchValueMatched && genFilterMatched && typeFilterMatched;
  });
}
