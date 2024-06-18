import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBasketItemComponent } from './card-basket-item.component';

describe('CardBasketItemComponent', () => {
  let component: CardBasketItemComponent;
  let fixture: ComponentFixture<CardBasketItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBasketItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardBasketItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
