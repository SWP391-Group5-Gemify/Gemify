import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFilePdfComponent } from './upload-file-pdf.component';

describe('UploadFilePdfComponent', () => {
  let component: UploadFilePdfComponent;
  let fixture: ComponentFixture<UploadFilePdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadFilePdfComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadFilePdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
