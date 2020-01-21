import { DBTeam } from './model/DBTeam';
import { BaseRepository, DBTableNames } from './BaseRepository';

export class TeamRepository extends BaseRepository {
  static addTeam(team : DBTeam) {
    BaseRepository.write(DBTableNames.team, team);
  }

  static getAllTeams() {
    //return BaseRepository.get
  }
}