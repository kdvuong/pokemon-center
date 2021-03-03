import { map } from "lodash-es";
import { GenderRate } from "shared/interfaces";
import data from "./genderRates.json";

const genderRates = data as GenderRate[];
let genderRatesMap: Map<number, GenderRate> = new Map();

genderRates.forEach((r) => {
  genderRatesMap.set(r.id, r);
});

export default genderRatesMap as ReadonlyMap<number, GenderRate>;
