import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldBidAskComponent } from './gold-bid-ask.component';

describe('GoldBidAskComponent', () => {
  let component: GoldBidAskComponent;
  let fixture: ComponentFixture<GoldBidAskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoldBidAskComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GoldBidAskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
