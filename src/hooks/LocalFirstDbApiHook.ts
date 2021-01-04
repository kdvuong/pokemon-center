import { useCallback } from "react";
import DbService, { IPouchDB, Document } from "../services/PokemonDbService";

interface ILocalFirstDbApi<T extends Document> {
  replicateToLocal: (fileCount?: number) => Promise<void>;
  getById: (id: number) => Promise<T>;
  getManyByIds: (ids: number[]) => Promise<T[]>;
  getAll: () => Promise<T[]>;
}

//execute database function on local db first
async function doLocalFirst<T extends Document>(
  dbFun: (db: IPouchDB<T>) => Promise<any>,
  dbService: DbService<T>
) {
  // hit the local DB first; if it 404s, then hit the remote
  try {
    return await dbFun(dbService.getLocal());
  } catch (err) {
    return await dbFun(dbService.getRemote());
  }
}

const useLocalFirstDbApi = <T extends Document>(service: DbService<T>): ILocalFirstDbApi<T> => {
  const replicateToLocal = useCallback(
    async (fileCount?: number) => {
      return service.replicate(fileCount);
    },
    [service]
  );

  const getById = useCallback(
    async (id: number) => {
      if (service) return await doLocalFirst((db: IPouchDB<T>) => service.getById(db, id), service);
      throw new Error("database does not exist");
    },
    [service]
  );

  const getManyByIds = useCallback(
    async (ids: number[]) => {
      if (service)
        return await doLocalFirst((db: IPouchDB<T>) => service.getManyByIds(db, ids), service);
      throw new Error("database does not exist");
    },
    [service]
  );

  const getAll = useCallback(async (): Promise<any> => {
    if (service) {
      return await doLocalFirst((db: IPouchDB<T>) => service.getAll(db), service);
    }
    throw new Error("database does not exist");
  }, [service]);

  return {
    replicateToLocal,
    getById,
    getManyByIds,
    getAll,
  };
};

export default useLocalFirstDbApi;
