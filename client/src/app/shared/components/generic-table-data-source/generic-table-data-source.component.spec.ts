import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericTableDataSourceComponent } from './generic-table-data-source.component';

describe('GenericTableDataSourceComponent', () => {
  let component: GenericTableDataSourceComponent;
  let fixture: ComponentFixture<GenericTableDataSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenericTableDataSourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenericTableDataSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
