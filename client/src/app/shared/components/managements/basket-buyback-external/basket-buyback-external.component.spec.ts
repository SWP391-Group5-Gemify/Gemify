import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasketBuybackExternalComponent } from './basket-buyback-external.component';

describe('BasketBuybackExternalComponent', () => {
  let component: BasketBuybackExternalComponent;
  let fixture: ComponentFixture<BasketBuybackExternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasketBuybackExternalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BasketBuybackExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
