import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutExBbMoneyBackComponent } from './checkout-ex-bb-money-back.component';

describe('CheckoutExBbMoneyBackComponent', () => {
  let component: CheckoutExBbMoneyBackComponent;
  let fixture: ComponentFixture<CheckoutExBbMoneyBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutExBbMoneyBackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutExBbMoneyBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
