import { TestBed } from '@angular/core/testing';

import { GoldChartService } from './gold-chart.service';

describe('GoldChartService', () => {
  let service: GoldChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoldChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
