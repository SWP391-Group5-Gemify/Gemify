import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditCreateEmployeeComponent } from './modal-edit-create-employee.component';

describe('ModalEditCreateEmployeeComponent', () => {
  let component: ModalEditCreateEmployeeComponent;
  let fixture: ComponentFixture<ModalEditCreateEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEditCreateEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalEditCreateEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
