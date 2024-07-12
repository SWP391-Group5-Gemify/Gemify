import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutExchangeCustomerComponent } from './checkout-exchange-customer.component';

describe('CheckoutExchangeCustomerComponent', () => {
  let component: CheckoutExchangeCustomerComponent;
  let fixture: ComponentFixture<CheckoutExchangeCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutExchangeCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutExchangeCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
