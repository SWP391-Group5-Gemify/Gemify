import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewEmployeeComponent } from './modal-view-employee.component';

describe('ModalViewEmployeeComponent', () => {
  let component: ModalViewEmployeeComponent;
  let fixture: ComponentFixture<ModalViewEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalViewEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalViewEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
