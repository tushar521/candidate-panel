import { TestBed } from '@angular/core/testing';

import { StandardApiStructureManagerService } from './standard-api-structure-manager.service';

describe('StandardApiStructureManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StandardApiStructureManagerService = TestBed.get(StandardApiStructureManagerService);
    expect(service).toBeTruthy();
  });
});
