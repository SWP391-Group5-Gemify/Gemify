import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMyProfileComponent } from './button-my-profile.component';

describe('ButtonMyProfileComponent', () => {
  let component: ButtonMyProfileComponent;
  let fixture: ComponentFixture<ButtonMyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonMyProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ButtonMyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
