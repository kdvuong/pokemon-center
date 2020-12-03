import data from "./pokemonColors.json";

let colors = data as Record<string, { background: string; content: string[] }>;

export default colors;
