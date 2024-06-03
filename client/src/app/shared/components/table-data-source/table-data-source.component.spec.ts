import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDataSourceComponent } from './table-data-source.component';

describe('TableDataSourceComponent', () => {
  let component: TableDataSourceComponent;
  let fixture: ComponentFixture<TableDataSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDataSourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableDataSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
