import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMyProfileComponent } from './page-my-profile.component';

describe('PageMyProfileComponent', () => {
  let component: PageMyProfileComponent;
  let fixture: ComponentFixture<PageMyProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageMyProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageMyProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
