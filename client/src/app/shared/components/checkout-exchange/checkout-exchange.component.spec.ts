import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutExchangeComponent } from './checkout-exchange.component';

describe('CheckoutExchangeComponent', () => {
  let component: CheckoutExchangeComponent;
  let fixture: ComponentFixture<CheckoutExchangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutExchangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutExchangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
