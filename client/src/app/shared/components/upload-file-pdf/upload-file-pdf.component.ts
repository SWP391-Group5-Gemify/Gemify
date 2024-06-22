import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FileService } from '../../../core/services/file/file.service';

@Component({
  selector: 'app-upload-file-pdf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upload-file-pdf.component.html',
  styleUrl: './upload-file-pdf.component.scss',
})
export class UploadFilePdfComponent {
  downloadURLs: string[] = [];
  selectedFiles?: FileList;

  constructor(private uploadFileService: FileService) {}

  onFileSelected(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      Array.from(this.selectedFiles).forEach((file: File) => {
        this.uploadFileService
          .uploadFile(file)
          .then((url) => {
            this.downloadURLs.push(url);
            console.log('File uploaded! URL:', url);
          })
          .catch((error) => {
            console.error('Upload failed:', error);
          });
      });
    }
  }
}
