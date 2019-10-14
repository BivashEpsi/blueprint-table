import { TestBed } from '@angular/core/testing';

import { TabledataService } from './tabledata.service';

describe('TabledataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabledataService = TestBed.get(TabledataService);
    expect(service).toBeTruthy();
  });
});
