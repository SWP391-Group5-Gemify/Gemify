import { Injectable } from '@angular/core';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
<<<<<<< HEAD
export class SnackbarService {
=======
export class NotificationService {
>>>>>>> de5ea53bd976468ff3e217a71a03350fb049420d
  // =============================
  // == Fields
  // =============================
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';

  // =============================
  // == Lifecycle
  // =============================
  constructor(private snackBar: MatSnackBar) {}

  // =============================
  // == Methods
  // =============================
  public show(
    message: string,
    action: string = 'Close',
    duration: number = 3000
  ): void {
    this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
