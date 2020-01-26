import { Component } from '@angular/core';
import { TeamRepository } from '../data-access/TeamRepository';
import { Logger } from 'src/game/util/logger';
import { DBTeam } from 'src/data-access/model/DBTeam';
import { BaseRepository } from '../data-access/BaseRepository';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gridiron-ng';
  hideGame = true;

  newGame() {
    if(this.hideGame) {
      this.hideGame = false;
    }
  }

  async resetDB() {
    await BaseRepository.resetDB();
  }

  async addTeam() {
    let team = new DBTeam();
    team.nameFirst = "test first name";
    team.nameLast = "team last name";
    team.nameShort = "TEST";
    team.colorMain = "rgb(0,0,0)";
    team.colorSec = "rgb(255,255,255)";
    await TeamRepository.addTeam(team);
  }

  async getTeams() {
    let allTeams : DBTeam[] = await TeamRepository.getAllTeams();
    allTeams.forEach((team) => Logger.log(team.toString()));
  }
}
