import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutExBbComponent } from './checkout-ex-bb.component';

describe('CheckoutExBbComponent', () => {
  let component: CheckoutExBbComponent;
  let fixture: ComponentFixture<CheckoutExBbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutExBbComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutExBbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
