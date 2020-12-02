import { Injectable } from '@angular/core';
import { DBTeam } from './model/DBTeam';
import { DBTableNames, DatabaseService } from './Database.service';

@Injectable({
  providedIn: 'root'
})
export class TeamRepositoryService {
  private readonly _db : DatabaseService;

  constructor(db : DatabaseService) {
    this._db = db;
  }

  async addTeam(team : DBTeam) {
    await this._db.write(DBTableNames.team, team);
  }

  async getAllTeams() : Promise<DBTeam[]> {
    let result : any[] = await this._db.readAll(DBTableNames.team);
    let teams : DBTeam[] = [];
    for(let row of result) {
      let team = new DBTeam();
      team.teamID = row.teamID;
      team.nameShort = row.nameShort;
      team.nameFirst = row.nameFirst;
      team.nameLast = row.nameLast;
      team.colorMain = row.colorMain;
      team.colorSec = row.colorSec;
      teams.push(team);
    }
    return teams;
  }
}
