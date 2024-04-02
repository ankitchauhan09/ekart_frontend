import { TestBed } from '@angular/core/testing';

import { UpdateCartService } from './update-cart.service';

describe('UpdateCartService', () => {
  let service: UpdateCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
