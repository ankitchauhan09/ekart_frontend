import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { checkoutResolver } from '../checkout.resolver';

describe('checkoutResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
      TestBed.runInInjectionContext(() => checkoutResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
