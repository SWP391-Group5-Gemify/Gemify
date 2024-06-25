import { Injectable } from '@angular/core';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  // ============================
  // == Fields
  // ============================

  // Base path for storing policy documents
  private baseDocumentsPolicyPath = '/documents/policy';

  /*
   * Path for storing product img: '/images/products'
   * Path for storing user img: '/images/users'
   */
  private baseImagesPath = '/images';

  // ============================
  // == Constructors
  // ============================
  constructor(private storage: Storage) {}

  // ============================
  // == Methods
  // ============================
  /**
   * Upload the policy file into the firestore
   * @param file
   * @returns
   */
  uploadPolicyFile(
    file: File
  ): Observable<{ progress: number; downloadUrl?: string }> {
    const filePath = `${this.baseDocumentsPolicyPath}/${file.name}`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Observable((observer) => {
      uploadTask.on(
        'state_changed',

        // Capture the progress when uploading
        (snapshot) => {
          // Emit the progress value
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          observer.next({ progress: progress });
        },

        // Error in Uploading
        (error) => {
          observer.error(error);
        },

        // Complete Uploading
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              observer.next({ progress: 100, downloadUrl: downloadURL });
              observer.complete();
            })
            .catch((error) => {
              observer.error(error);
            });
        }
      );
    });
  }
}
