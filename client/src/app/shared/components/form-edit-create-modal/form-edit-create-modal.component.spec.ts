import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditCreateModalComponent } from './form-edit-create-modal.component';

describe('FormEditCreateModalComponent', () => {
  let component: FormEditCreateModalComponent;
  let fixture: ComponentFixture<FormEditCreateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormEditCreateModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormEditCreateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
