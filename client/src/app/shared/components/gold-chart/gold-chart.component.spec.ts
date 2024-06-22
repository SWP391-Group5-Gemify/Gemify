import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldChartComponent } from './gold-chart.component';

describe('GoldChartComponent', () => {
  let component: GoldChartComponent;
  let fixture: ComponentFixture<GoldChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoldChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoldChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
