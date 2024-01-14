import { TestBed } from '@angular/core/testing';

import { EmailRevolverService } from './email-revolver.service';

describe('EmailRevolverService', () => {
  let service: EmailRevolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailRevolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
