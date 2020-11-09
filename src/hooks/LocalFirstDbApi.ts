import DbService, { IPouchDB } from "../services/PokemonDbService";

interface ILocalFirstDbApi {
  replicateToLocal: (fileCount?: number) => Promise<void>;
  getById: (id: number) => Promise<any>;
  getManyByIds: (ids: number[]) => Promise<any>;
  getAll: () => Promise<any>;
}

//execute database function on local db first
async function doLocalFirst(
  dbFun: (db: IPouchDB) => Promise<any>,
  dbService: DbService
) {
  // hit the local DB first; if it 404s, then hit the remote
  try {
    return await dbFun(dbService.getLocal());
  } catch (err) {
    return await dbFun(dbService.getRemote());
  }
}

const useLocalFirstDbApi = (dbService: DbService): ILocalFirstDbApi => {
  const replicateToLocal = async (fileCount?: number) => {
    return dbService.replicate(fileCount);
  };

  const getById = async (id: number) => {
    if (dbService)
      return await doLocalFirst(
        (db: IPouchDB) => dbService.getById(db, id),
        dbService
      );
    throw new Error("database does not exist");
  };

  const getManyByIds = async (ids: number[]) => {
    if (dbService)
      return await doLocalFirst(
        (db: IPouchDB) => dbService.getManyByIds(db, ids),
        dbService
      );
    throw new Error("database does not exist");
  };

  const getAll = async (): Promise<any> => {
    if (dbService) {
      return await doLocalFirst(
        (db: IPouchDB) => dbService.getAll(db),
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
