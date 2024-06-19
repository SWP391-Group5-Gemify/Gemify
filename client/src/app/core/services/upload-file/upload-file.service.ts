import { Injectable, inject } from '@angular/core';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  // Base path for storing policy documents
  private basePath = '/documents/policy';
  /*
   * Path for storing product img: '/images/products'
   * Path for storing user img: '/images/users'
   */

  constructor(private storage: Storage) {}

  uploadFile(file: File): Promise<string> {
    const filePath = `${this.basePath}/${file.name}`;
    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }
}
