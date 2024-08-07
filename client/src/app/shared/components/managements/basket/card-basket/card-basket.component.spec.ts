import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBasketComponent } from './card-basket.component';

describe('CardBasketComponent', () => {
  let component: CardBasketComponent;
  let fixture: ComponentFixture<CardBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardBasketComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
