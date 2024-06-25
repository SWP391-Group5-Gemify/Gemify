import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalChangeGoldWeightComponent } from './modal-change-gold-weight.component';

describe('ModalChangeGoldWeightComponent', () => {
  let component: ModalChangeGoldWeightComponent;
  let fixture: ComponentFixture<ModalChangeGoldWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalChangeGoldWeightComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalChangeGoldWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
