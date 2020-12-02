import { Injectable } from '@angular/core';
import { openDB, deleteDB, wrap, unwrap, IDBPDatabase } from 'idb';
import { LoggerService } from '../app/services/logger.service';

export enum DBTableNames {
  team = "team", 
  player = "player", 
  playerRoster = "playerRoster", 
  position = "position", 
  positionGroup = "positionGroup"
}

let _dbName = "gridiron-js";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  protected readonly _log : LoggerService;

  constructor(logger : LoggerService) {
    this._log = logger;
  }

  async resetDB() {
    window.indexedDB.deleteDatabase(_dbName);
    await initDb();
  }

  async getDB() : Promise<IDBPDatabase<unknown>> {
    return await openDB(_dbName, 1);
  }

  async write(tableName : DBTableNames, data : any) {
    const db : IDBPDatabase<unknown> = await this.getDB();
    db.put(tableName, data);
  }

  async readAll(tableName : DBTableNames) : Promise<any[]> {
    const db : IDBPDatabase<unknown> = await this.getDB();
    return await db.getAll(tableName);
  }
}

export async function initDb() {
  if(!window.indexedDB) {
    throw new Error("IndexedDB isn't working :/");
  }

  await openDB(_dbName, 1, {
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