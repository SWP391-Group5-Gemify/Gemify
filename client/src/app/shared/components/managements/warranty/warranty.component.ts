import { Component } from '@angular/core';
import { UploadFilePdfComponent } from '../../upload-file-pdf/upload-file-pdf.component';

@Component({
  selector: 'app-warranty',
  standalone: true,
  imports: [UploadFilePdfComponent],
  templateUrl: './warranty.component.html',
  styleUrl: './warranty.component.scss',
})
export class WarrantyComponent {}
