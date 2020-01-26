import { Logger } from '../game/util/logger';
import { waitFor } from '../game/util/threadUtils';
import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from 'idb';

export enum DBTableNames {
  team = "team", 
  player = "player", 
  playerRoster = "playerRoster", 
  position = "position", 
  positionGroup = "positionGroup"
}

export class BaseRepository {
  protected static readonly dbName = "gridiron-js";

  static async initDB() {
    if(!window.indexedDB) {
      Logger.log("IndexedDB isn't working");
    }

    await openDB(this.dbName, 1, {
      upgrade(db, oldVersion, newVersion, transaction) {
        // create object stores
        if(!db.objectStoreNames.contains(DBTableNames.team)) {
          db.createObjectStore(DBTableNames.team, { keyPath: "teamID", autoIncrement: true });
        }
        if(!db.objectStoreNames.contains(DBTableNames.player)) {
          db.createObjectStore(DBTableNames.player, { keyPath: "playerID", autoIncrement: true });
        }
        if(!db.objectStoreNames.contains(DBTableNames.playerRoster)) {
          db.createObjectStore(DBTableNames.playerRoster, { keyPath: "playerRosterID", autoIncrement: true });
        }
        if(!db.objectStoreNames.contains(DBTableNames.position)) {
          db.createObjectStore(DBTableNames.position, { keyPath: "positionID", autoIncrement: true });
        }
        if(!db.objectStoreNames.contains(DBTableNames.positionGroup)) {
          db.createObjectStore(DBTableNames.positionGroup, { keyPath: "positionGroupID", autoIncrement: true });
        }
      }
    });
  }

  static async resetDB() {
    window.indexedDB.deleteDatabase(this.dbName);
    await this.initDB();
  }

  protected static async getDB() : Promise<IDBPDatabase<unknown>> {
    return await openDB(this.dbName, 1);
  }

  protected static async write(tableName : DBTableNames, data : any) {
    const db : IDBPDatabase<unknown> = await BaseRepository.getDB();
    db.put(tableName, data);
  }

  protected static async readAll(tableName : DBTableNames) : Promise<any[]> {
    const db : IDBPDatabase<unknown> = await BaseRepository.getDB();
    return await db.getAll(tableName);
  }
}