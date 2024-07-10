import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSaleCounterComponent } from './card-sale-counter.component';

describe('CardSaleCounterComponent', () => {
  let component: CardSaleCounterComponent;
  let fixture: ComponentFixture<CardSaleCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSaleCounterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardSaleCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
