import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsManagementComponent } from './product-details-management.component';

describe('ProductDetailsManagementComponent', () => {
  let component: ProductDetailsManagementComponent;
  let fixture: ComponentFixture<ProductDetailsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductDetailsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
