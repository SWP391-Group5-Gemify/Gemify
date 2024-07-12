import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutExBbPaymentComponent } from './checkout-ex-bb-payment.component';

describe('CheckoutExBbPaymentComponent', () => {
  let component: CheckoutExBbPaymentComponent;
  let fixture: ComponentFixture<CheckoutExBbPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutExBbPaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutExBbPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
