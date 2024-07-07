import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterRevenuesInAMonthChartComponent } from './counter-revenues-in-a-month-chart.component';

describe('CounterRevenuesInAMonthChartComponent', () => {
  let component: CounterRevenuesInAMonthChartComponent;
  let fixture: ComponentFixture<CounterRevenuesInAMonthChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterRevenuesInAMonthChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CounterRevenuesInAMonthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
