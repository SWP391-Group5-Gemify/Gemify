import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterRevenuesYearlyChartComponent } from './counter-revenues-yearly-chart.component';

describe('CounterRevenuesYearlyChartComponent', () => {
  let component: CounterRevenuesYearlyChartComponent;
  let fixture: ComponentFixture<CounterRevenuesYearlyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterRevenuesYearlyChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CounterRevenuesYearlyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
