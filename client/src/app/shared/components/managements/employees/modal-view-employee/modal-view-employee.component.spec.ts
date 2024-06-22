import { ComponentFixture, TestBed } from '@angular/core/testing';

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
