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

const useLocalFirstDbApi = <T extends Document>(
  dbService: DbService<T>
): ILocalFirstDbApi<T> => {
  const replicateToLocal = async (fileCount?: number) => {
    return dbService.replicate(fileCount);
  };

  const getById = async (id: number) => {
    if (dbService)
      return await doLocalFirst(
        (db: IPouchDB<T>) => dbService.getById(db, id),
        dbService
      );
    throw new Error("database does not exist");
  };

  const getManyByIds = async (ids: number[]) => {
    if (dbService)
      return await doLocalFirst(
        (db: IPouchDB<T>) => dbService.getManyByIds(db, ids),
        dbService
      );
    throw new Error("database does not exist");
  };

  const getAll = async (): Promise<any> => {
    if (dbService) {
      return await doLocalFirst(
        (db: IPouchDB<T>) => dbService.getAll(db),
        dbService
      );
    }
    throw new Error("database does not exist");
  };

  return {
    replicateToLocal,
    getById,
    getManyByIds,
    getAll,
  };
};

export default useLocalFirstDbApi;
