import { Logger } from '../game/util/logger';
export enum DBTableNames {
  team = "team", 
  player = "player", 
  playerRoster = "playerRoster", 
  position = "position", 
  positionGroup = "positionGroup"
}

export class BaseRepository {
  protected static readonly dbName = "gridiron-js";

  static initDB() {
    if(!window.indexedDB) {
      Logger.log("IndexedDB isn't working");
    }
  
    let request : IDBOpenDBRequest = BaseRepository.createDBRequest();
    request.onupgradeneeded = (event : IDBVersionChangeEvent) => {
      let db : IDBDatabase = request.result;
  
      // create object stores
      if(!db.objectStoreNames.contains("team")) {
        db.createObjectStore("team", {keyPath: "teamID"});
      }

      if(!db.objectStoreNames.contains('player')) {
        db.createObjectStore('player', {keyPath: 'playerID'});
      }

      if(!db.objectStoreNames.contains('playerRoster')) {
        db.createObjectStore('playerRoster', {keyPath: 'playerRosterID', autoIncrement: true});
      }

      if(!db.objectStoreNames.contains('position')) {
        db.createObjectStore('position', {keyPath: 'positionID'});
      }

      if(!db.objectStoreNames.contains('positionGroup')) {
        db.createObjectStore('positionGroup', {keyPath: 'positionGroupID'});
      }
    };
  }

  protected static getDB() : IDBDatabase {
    return BaseRepository.createDBRequest().result;
  }

  protected static createDBRequest() : IDBOpenDBRequest {
    return window.indexedDB.open(BaseRepository.dbName);
  }

  private static createTransaction(tableName : DBTableNames, write = false) : IDBTransaction {
    let db : IDBDatabase = BaseRepository.getDB();
    return db.transaction(tableName, write ? "readwrite" : "readonly");
  }

  private static executeTransaction(request : IDBRequest) : any {
    request.onsuccess = () => { 
      return request.result; 
    };
    request.onerror = () => {
      throw new Error("IndexedDB transaction failed :(");
    }
  }

  protected static write(tableName : DBTableNames, data : any) {
    let transaction : IDBTransaction = BaseRepository.createTransaction(tableName, true);
    let store : IDBObjectStore = transaction.objectStore(tableName);
    let request : IDBRequest = store.add(data);
    this.executeTransaction(request);
  }

  protected static readAll(tableName : DBTableNames) {
    let transaction : IDBTransaction = BaseRepository.createTransaction(tableName, true);
    let store : IDBObjectStore = transaction.objectStore(tableName);
    let request : IDBRequest = store.getAll();
    this.executeTransaction(request);
  }
}