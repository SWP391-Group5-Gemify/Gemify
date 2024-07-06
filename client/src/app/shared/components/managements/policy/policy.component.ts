import { Component, inject, signal } from '@angular/core';
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
import { AuthService } from '../../../../core/services/auth/auth.service';
import { RoleEnum } from '../../../../core/models/role.model';

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
    private fileService: FileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadLatestPolicyFile();
  }

  // ============================
  // == Methods
  // ============================

  /**
   * Only store owner can upload policy file
   * @returns
   */
  public isPdfUploadMode(): boolean {
    const allowedViewModeRole: RoleEnum[] = [RoleEnum.StoreOwner];
    return allowedViewModeRole.includes(this.authService.currentUser()?.role!);
  }

  /**
   * Handle selected file for uploading
   * @param files
   */
  public handleFileSelected(files: File[]) {
    this.selectedFiles = files;
  }

  /**
   * Upload the PDF file
   */
  public uploadPolicyFile(): void {
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
                this.notificationService.show('Upload File Successfully');
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
  private loadLatestPolicyFile(): void {
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
