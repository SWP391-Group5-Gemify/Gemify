import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPromotionComponent } from './card-promotion.component';

describe('CardPromotionComponent', () => {
  let component: CardPromotionComponent;
  let fixture: ComponentFixture<CardPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPromotionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
