import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutExchangePaymentComponent } from './checkout-exchange-payment.component';

describe('CheckoutExchangePaymentComponent', () => {
  let component: CheckoutExchangePaymentComponent;
  let fixture: ComponentFixture<CheckoutExchangePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutExchangePaymentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutExchangePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
