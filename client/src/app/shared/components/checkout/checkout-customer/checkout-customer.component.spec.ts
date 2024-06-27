import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCustomerComponent } from './checkout-customer.component';

describe('CheckoutCustomerComponent', () => {
  let component: CheckoutCustomerComponent;
  let fixture: ComponentFixture<CheckoutCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
