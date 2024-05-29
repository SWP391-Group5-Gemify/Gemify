import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepurchaserDashboardComponent } from './repurchaser-dashboard.component';

describe('RepurchaserDashboardComponent', () => {
  let component: RepurchaserDashboardComponent;
  let fixture: ComponentFixture<RepurchaserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepurchaserDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepurchaserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
