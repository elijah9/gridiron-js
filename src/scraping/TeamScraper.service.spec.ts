/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TeamScraperService } from './TeamScraper.service';

describe('Service: TeamScraper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamScraperService]
    });
  });

  it('should ...', inject([TeamScraperService], (service: TeamScraperService) => {
    expect(service).toBeTruthy();
  }));
});
