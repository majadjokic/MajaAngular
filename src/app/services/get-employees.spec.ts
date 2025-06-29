import { TestBed } from '@angular/core/testing';

import { GetEmployees } from './get-employees';

describe('GetEmployees', () => {
  let service: GetEmployees;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetEmployees);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
