import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraiserComponent } from './appraiser-dashboard.component';

describe('AppraiserComponent', () => {
  let component: AppraiserComponent;
  let fixture: ComponentFixture<AppraiserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppraiserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppraiserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
