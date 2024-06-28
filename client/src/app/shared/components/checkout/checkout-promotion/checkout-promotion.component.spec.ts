import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutPromotionComponent } from './checkout-promotion.component';

describe('CheckoutPromotionComponent', () => {
  let component: CheckoutPromotionComponent;
  let fixture: ComponentFixture<CheckoutPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutPromotionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
