import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsTotalRowsComponent } from './stats-total-rows.component';

describe('StatsTotalRowsComponent', () => {
  let component: StatsTotalRowsComponent;
  let fixture: ComponentFixture<StatsTotalRowsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsTotalRowsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatsTotalRowsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
