/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TeamRepositoryService } from './TeamRepository.service';

describe('Service: TeamRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeamRepositoryService]
    });
  });

  it('should ...', inject([TeamRepositoryService], (service: TeamRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
