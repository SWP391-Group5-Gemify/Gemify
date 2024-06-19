import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateNewBasketComponent } from './modal-create-new-basket.component';

describe('ModalCreateNewBasketComponent', () => {
  let component: ModalCreateNewBasketComponent;
  let fixture: ComponentFixture<ModalCreateNewBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCreateNewBasketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalCreateNewBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
