import { Component } from '@angular/core';
import { UploadFilePdfComponent } from '../../upload-file-pdf/upload-file-pdf.component';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [UploadFilePdfComponent],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.scss',
})
export class PolicyComponent {}
