import { ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:client/src/app/shared/components/managements/employees/modal-view-employee/modal-view-employee.component.spec.ts
<<<<<<< HEAD
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
=======
import { ModalViewCurrentUserComponent } from './modal-view-employee.component';
=======
import { ModalViewCurrentUserComponent } from './modal-view-current-user.component';
>>>>>>> ba6fea92d29293969f8a61064be98865c10d61bf:client/src/app/shared/components/managements/employees/modal-view-current-user/modal-view-current-user.component.spec.ts

describe('ModalViewEmployeeComponent', () => {
  let component: ModalViewCurrentUserComponent;
  let fixture: ComponentFixture<ModalViewCurrentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalViewCurrentUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalViewCurrentUserComponent);
>>>>>>> de5ea53bd976468ff3e217a71a03350fb049420d
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
