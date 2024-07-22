import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEmptyListComponent } from './show-empty-list.component';

describe('ShowEmptyListComponent', () => {
  let component: ShowEmptyListComponent;
  let fixture: ComponentFixture<ShowEmptyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowEmptyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowEmptyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
