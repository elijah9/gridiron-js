import { DBTeam } from './model/DBTeam';
import { BaseRepository, DBTableNames } from './BaseRepository';

export class TeamRepository extends BaseRepository {
  static async addTeam(team : DBTeam) {
    await BaseRepository.write(DBTableNames.team, team);
  }

  static async getAllTeams() : Promise<DBTeam[]> {
    let result : any[] = await BaseRepository.readAll(DBTableNames.team);
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