import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutExBbCustomerComponent } from './checkout-ex-bb-customer.component';

describe('CheckoutExBbCustomerComponent', () => {
  let component: CheckoutExBbCustomerComponent;
  let fixture: ComponentFixture<CheckoutExBbCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutExBbCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutExBbCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
