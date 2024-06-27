import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBasketItemsComponent } from './table-basket-items.component';

describe('TableBasketItemsComponent', () => {
  let component: TableBasketItemsComponent;
  let fixture: ComponentFixture<TableBasketItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableBasketItemsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableBasketItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
