import { TestBed } from '@angular/core/testing';

import { UtfformService } from './utfform.service';

describe('UtfformService', () => {
  let service: UtfformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtfformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
