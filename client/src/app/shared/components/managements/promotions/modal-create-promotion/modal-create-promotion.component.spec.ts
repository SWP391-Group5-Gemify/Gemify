import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreatePromotionComponent } from './modal-create-promotion.component';

describe('ModalCreatePromotionComponent', () => {
  let component: ModalCreatePromotionComponent;
  let fixture: ComponentFixture<ModalCreatePromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreatePromotionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCreatePromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
