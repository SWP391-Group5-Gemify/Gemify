import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepurchaserComponent } from './repurchaser-dashboard.component';

describe('RepurchaserComponent', () => {
  let component: RepurchaserComponent;
  let fixture: ComponentFixture<RepurchaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepurchaserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepurchaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
