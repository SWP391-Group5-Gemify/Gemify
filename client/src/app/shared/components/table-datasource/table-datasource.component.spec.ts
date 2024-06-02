import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDatasourceComponent } from './table-datasource.component';

describe('TableDatasourceComponent', () => {
  let component: TableDatasourceComponent;
  let fixture: ComponentFixture<TableDatasourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDatasourceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableDatasourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
