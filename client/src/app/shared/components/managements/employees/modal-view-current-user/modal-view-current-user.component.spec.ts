import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewCurrentUserComponent } from './modal-view-current-user.component';

describe('ModalViewEmployeeComponent', () => {
  let component: ModalViewCurrentUserComponent;
  let fixture: ComponentFixture<ModalViewCurrentUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalViewCurrentUserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalViewCurrentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
