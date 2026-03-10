/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MenuConfigService } from './menu-config.service';

describe('Service: MenuConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MenuConfigService]
    });
  });

  it('should ...', inject([MenuConfigService], (service: MenuConfigService) => {
    expect(service).toBeTruthy();
  }));
});
