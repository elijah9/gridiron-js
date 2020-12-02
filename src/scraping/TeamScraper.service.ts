import { Injectable } from '@angular/core';
import { DBTeam } from '../data-access/model/DBTeam';
import * as $ from "jquery";
import { LiteEvent } from '../game/util/iLiteEvent';
import { LoggerService } from '../app/services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class TeamScraperService {
  private readonly _log : LoggerService;
  private readonly _proxyUrl = "https://cors-anywhere.herokuapp.com/";
  private readonly _wikipediaBase = "https://en.wikipedia.org/";
  private readonly _localhost = "http://localhost:4200/";

  constructor(logger : LoggerService) {
    this._log = logger;
  }

  scrapeLeague() {
    const url = this._proxyUrl + this._wikipediaBase + "wiki/2020_NFL_season";
    $.get(url, (data : any) => {
      let tables = $(data).find("#mw-content-text h3:contains('Conference')").nextAll();
      for(let i = 0; i <= 1; ++i) {
        let table : any = tables[i];
        let link : any = $(table).find("a")[0];
        let href : string = link.href;
        let conferenceName : string = link.innerHTML;
        this._log.log(conferenceName);
        this.scrapeConference(this._proxyUrl + href.replace(this._localhost, this._wikipediaBase));
      }  
    }); 
  }

  private scrapeConference(url : string) {
    $.get(url, (data : any) => {
      let table = $(data).find(".wikitable")[0];
      let teamLinks = $(table).find("b a");
      for(let i = 0; i < teamLinks.length; ++i) {
        let teamLink = teamLinks[i];
        let href : string = teamLink.href;
        let teamName : string = teamLink.innerHTML;
        this._log.log(teamName);
        this.scrapeTeam(this._proxyUrl + href.replace(this._localhost, this._wikipediaBase));
      }
    });
  }

  private scrapeTeam(url : string) {
    $.get(url, (data : any) => {
      console.log(data);
    });
  }
}
