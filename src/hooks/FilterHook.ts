import { useCallback, useState } from "react";
import { Filter } from "shared/interfaces";

interface IFilter<T> {
  filter: T | null;
  onChange: (newValue: string) => void;
}

const useFilter = <T>(FilterClass: Filter<T>): IFilter<T> => {
  const [filter, setFilter] = useState<T | null>(null);

  const onChange = useCallback(
    (newValue: string) => {
      const newFilter: T | undefined = FilterClass.getTypeFromValue(newValue);
      if (newFilter) {
        setFilter(newFilter);
      } else {
        setFilter(null);
      }
    },
    [FilterClass]
  );

  return { filter, onChange };
};

export default useFilter;
