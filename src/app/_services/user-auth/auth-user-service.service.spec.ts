import { TestBed } from '@angular/core/testing';

import { AuthUserServiceService } from './auth-user-service.service';

describe('AuthUserServiceService', () => {
  let service: AuthUserServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUserServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
