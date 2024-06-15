import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericStackedChipsComponent } from './generic-stacked-chips.component';

describe('GenericStackedChipsComponent', () => {
  let component: GenericStackedChipsComponent;
  let fixture: ComponentFixture<GenericStackedChipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericStackedChipsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericStackedChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
