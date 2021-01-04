import PouchDB from "pouchdb";
import orderBy from "lodash-es/orderBy";
import PouchLoad from "pouchdb-load";
import { auth } from "../constants/cloudant.config";
import { DbName } from "enums";

PouchDB.plugin(PouchLoad);
PouchDB.plugin(require("pouchdb-upsert"));

export interface Document {
  _id: string;
  _rev: string;
  title: string;
  _attachments: any;
}

interface DocumentRow<T> {
  doc: T;
  id: string;
  key: string;
  value: any;
}

interface AllDocsResponse<T> {
  offset: number;
  total_rows: number;
  rows: DocumentRow<T>[];
}

interface DBInfo {
  db_name: string;
  doc_count: number;
  update_seq: number;
}

export interface IPouchDB<T> {
  get: (id: string) => Promise<T>;
  putIfNotExists: (doc: any) => Promise<void>;
  allDocs: (options: any) => Promise<AllDocsResponse<T>>;
  info: () => Promise<DBInfo>;
  load: (path: string) => Promise<void>;
}

class PokemonDbService<T extends Document> {
  private url: string;
  private name: string;
  private local: IPouchDB<T>;
  private remote: IPouchDB<T>;
  constructor(dbName: string) {
    this.url = `https://${auth.username}.cloudantnosqldb.appdomain.cloud/${dbName}`;
    this.name = dbName;
    this.local = new PouchDB(dbName);
    this.remote = new PouchDB(this.url, { auth: auth });
  }

  getLocal(): IPouchDB<T> {
    return this.local;
  }

  getRemote(): IPouchDB<T> {
    return this.remote;
  }

  getName(): string {
    return this.name;
  }

  private async markReplicated(): Promise<void> {
    await this.local.putIfNotExists({
      _id: "replicated",
    });
  }

  private async checkReplicated(): Promise<boolean> {
    try {
      await this.local.get("replicated");
      return true;
    } catch (ignored) {
      return false;
    }
  }

  async replicate(numFiles?: number): Promise<void> {
    const local = this.local;
    const isReplicated = await this.checkReplicated();
    if (isReplicated) {
      console.log(`replication already done`);
      return;
    }
    //   console.log(`started replication`);
    let file = `${process.env.PUBLIC_URL}/assets/localData/${this.name}.txt`;
    if (numFiles) {
      let replications = [];
      for (var i = 1; i <= numFiles; i++) {
        // file was broken up into smaller files
        replications.push(local.load(file.replace(".txt", `-${i}.txt`)));
      }
      try {
        await Promise.all(replications);
        this.markReplicated();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        console.log("start: " + file);
        await local.load(file);
        this.markReplicated();
      } catch (err) {
        console.log(err);
      }
    }
  }

  async getById(db: IPouchDB<T>, docId: number): Promise<T> {
    return await db.get(docId.toString());
  }

  async getManyByIds(db: IPouchDB<T>, docIds: number[]): Promise<T[]> {
    const res = await db.allDocs({
      include_docs: true,
      keys: docIds.map((id) => id.toString()),
    });
    if (!res.rows.every((row) => row.doc)) {
      throw new Error("doc not found");
    }
    return res.rows.map((row) => row.doc);
  }

  async getAll(db: IPouchDB<T>): Promise<any> {
    const info = await db.info();
    if (info.doc_count === 0) {
      //check if db (assuming local) is empty
      throw new Error("database is empty");
    }
    let res = [];
    const all = await db.allDocs({ include_docs: true });
    //get all documents that have id different from "replicated"
    for (let i = 0; i < all.rows.length; i++) {
      if (all.rows[i].doc._id !== "replicated") res.push(all.rows[i].doc);
    }
    //sort documents by id in ascending order
    res = orderBy(res, ["id"], ["asc"]);
    return res;
  }
}

export default PokemonDbService;

export const typeService = new PokemonDbService(DbName.POKEMON_TYPES);
