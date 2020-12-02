import { Component } from '@angular/core';
import { DBTeam } from 'src/data-access/model/DBTeam';
import { LoggerService } from './services/logger.service';
import { DatabaseService } from '../data-access/Database.service';
import { TeamRepositoryService } from '../data-access/TeamRepository.service';
import { TeamScraperService } from '../scraping/TeamScraper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gridiron-ng';
  hideGame = true;

  private readonly _log : LoggerService;
  private readonly _db : DatabaseService;
  private readonly _teamRepository : TeamRepositoryService;
  private readonly _teamScraper : TeamScraperService;

  constructor(logger : LoggerService, db : DatabaseService, 
    teamRepository : TeamRepositoryService, teamScraper : TeamScraperService) {

    this._log = logger;
    this._db = db;
    this._teamRepository = teamRepository;
    this._teamScraper = teamScraper;
  }

  newGame() {
    if(this.hideGame) {
      this.hideGame = false;
    }
  }

  async resetDB() {
    await this._db.resetDB();
  }

  async scrapeTeams() {
    this._teamScraper.scrapeLeague();

    // let team = new DBTeam();
    // team.nameFirst = "test first name";
    // team.nameLast = "team last name";
    // team.nameShort = "TEST";
    // team.colorMain = "rgb(0,0,0)";
    // team.colorSec = "rgb(255,255,255)";
    // await TeamRepository.addTeam(team);
  }

  async getTeams() {
    let allTeams : DBTeam[] = await this._teamRepository.getAllTeams();
    allTeams.forEach((team) => this._log.log(team.toString()));
  }
}
