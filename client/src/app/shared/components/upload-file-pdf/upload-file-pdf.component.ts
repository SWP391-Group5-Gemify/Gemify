import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FileService } from '../../../core/services/file/file.service';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Subject, tap } from 'rxjs';

@Component({
  selector: 'app-upload-file-pdf',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatListModule, MatProgressBarModule],
  templateUrl: './upload-file-pdf.component.html',
  styleUrl: './upload-file-pdf.component.scss',
})
export class UploadFilePdfComponent {
  // ============================
  // == Fields
  // ============================
  downloadURLs: string[] = [];
  selectedFiles: File[] = [];
  uploadProgress$: Subject<number> = new Subject<number>();

  // ============================
  // == Constructors
  // ============================
  constructor(private fileService: FileService) {}

  // ============================
  // == Methods
  // ============================
  /**
   * When user selects one or more files, capture the list of files and store within the * FileList
   * @param event
   */
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    // If select file, then push into the list of pre-uploaded file
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  /**
   * Upload the PDF file
   */
  uploadPolicyFile(): void {
    if (this.selectedFiles) {
      this.selectedFiles.forEach((file: File) => {
        this.fileService
          .uploadPolicyFile(file)
          .pipe(
            tap((result) => {
              this.uploadProgress$.next(result.progress);
            })
          )
          .subscribe({
            next: (result) => {
              if (result.downloadUrl) {
                this.downloadURLs.push(result.downloadUrl);
                this.uploadProgress$.next(0); // Reset progress after each file uploaded completely
              }
            },

            error: (err) => {
              this.uploadProgress$.next(0);
              console.error(err);
            },
          });
      });
    }
  }
}
