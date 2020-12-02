/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DatabaseService } from './Database.service';

describe('Service: DatabaseRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DatabaseService]
    });
  });

  it('should ...', inject([DatabaseService], (service: DatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
