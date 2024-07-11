import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreRevenuesYearlyComponent } from './store-revenues-yearly.component';

describe('StoreRevenuesYearlyComponent', () => {
  let component: StoreRevenuesYearlyComponent;
  let fixture: ComponentFixture<StoreRevenuesYearlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StoreRevenuesYearlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StoreRevenuesYearlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
