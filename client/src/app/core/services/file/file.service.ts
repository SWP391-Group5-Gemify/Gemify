import { Injectable } from '@angular/core';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
} from 'firebase/storage';
import { Storage } from '@angular/fire/storage';
import { from, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  // ============================
  // == Fields
  // ============================

  // ============================
  // == Fields
  // ============================
  /**
   * Path for storing product img: '/images/products'
   * Path for storing user img: '/images/users'
   * Path for storing policy files img: '/documents/policy'
   */
  private baseDocumentsPolicyPath = '/documents/policy';
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

  /**
   * Download policy file, get the url from the firestore
   * @returns
   */
  getLatestPolicyFile(): Observable<string> {
    const filePath = this.baseDocumentsPolicyPath;
    const storageRef = ref(this.storage, filePath);
    const downloadTask = listAll(storageRef);

    return new Observable((observer) => {
      downloadTask
        .then((res) => {
          if (res.items.length > 0) {
            // Get the first url file
            getDownloadURL(res.items[0])
              .then((url) => {
                observer.next(url);
                observer.complete();
              })
              .catch((error) => {
                observer.error(error);
              });
          } else {
            observer.error('No files found in specified path');
          }
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }
}
