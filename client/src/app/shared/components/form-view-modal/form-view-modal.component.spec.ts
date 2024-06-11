import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormViewModalComponent } from './form-view-modal.component';

describe('FormViewModalComponent', () => {
  let component: FormViewModalComponent;
  let fixture: ComponentFixture<FormViewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormViewModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormViewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
