import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBasketItemsSummaryComponent } from './table-basket-items-summary.component';

describe('TableBasketItemsSummaryComponent', () => {
  let component: TableBasketItemsSummaryComponent;
  let fixture: ComponentFixture<TableBasketItemsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableBasketItemsSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableBasketItemsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
