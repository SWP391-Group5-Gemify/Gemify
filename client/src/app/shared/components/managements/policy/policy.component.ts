import { Component, signal } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Observable, Subject, tap } from 'rxjs';
import { FileService } from '../../../../core/services/file/file.service';
import { FileSelectorComponent } from './file-selector/file-selector.component';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import ImageUtils from '../../../utils/ImageUtils';

@Component({
  selector: 'app-policy',
  standalone: true,
  imports: [
    PdfViewerModule,
    CommonModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    FileSelectorComponent,
  ],
  templateUrl: './policy.component.html',
  styleUrl: './policy.component.scss',
})
export class PolicyComponent {
  // ============================
  // == Fields
  // ============================
  selectedFiles: File[] = [];
  currentPdfSrc = signal<string>('');
  uploadProgress: Subject<number> = new Subject<number>();

  // ============================
  // == Constructors
  // ============================
  constructor(
    private notificationService: NotificationService,
    private fileService: FileService
  ) {}

  ngOnInit(): void {
    this.loadLatestPolicyFile();
  }

  // ============================
  // == Methods
  // ============================

  /**
   * Handle selected file for uploading
   * @param files
   */
  handleFileSelected(files: File[]) {
    this.selectedFiles = files;
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
              this.uploadProgress.next(result.progress);
            })
          )
          .subscribe({
            next: (result) => {
              if (result.downloadUrl) {
                this.uploadProgress.next(0); // Reset progress after each file uploaded completely
                this.currentPdfSrc.set(result.downloadUrl);
              }
            },

            error: (err) => {
              this.uploadProgress.next(0);
              console.error(err);
            },
          });
      });
    }
  }

  /**
   * Download the PDF file
   */
  loadLatestPolicyFile(): void {
    this.fileService.getLatestPolicyFile().subscribe({
      next: (latestUrl) => {
        console.log(latestUrl);
        this.currentPdfSrc.set(ImageUtils.concatLinkToTokenFirebase(latestUrl));
      },

      error: (err) => {
        this.notificationService.show('Cannot get file. Please try again');
      },
    });
  }
}
