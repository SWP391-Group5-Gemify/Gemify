import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraiserDashboardComponent } from './appraiser-dashboard.component';

describe('AppraiserDashboardComponent', () => {
  let component: AppraiserDashboardComponent;
  let fixture: ComponentFixture<AppraiserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppraiserDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppraiserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
