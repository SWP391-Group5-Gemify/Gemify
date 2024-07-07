import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterRevenuesChartComponent } from './counter-revenues-chart.component';

describe('CounterRevenuesChartComponent', () => {
  let component: CounterRevenuesChartComponent;
  let fixture: ComponentFixture<CounterRevenuesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterRevenuesChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CounterRevenuesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
