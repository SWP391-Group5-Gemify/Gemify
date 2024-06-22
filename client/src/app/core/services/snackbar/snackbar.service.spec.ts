import { TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { SnackbarService } from './snackbar.service';

describe('SnackbarService', () => {
  let service: SnackbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackbarService);
=======
import { NotificationService } from './snackbar.service';

describe('SnackbarService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
>>>>>>> de5ea53bd976468ff3e217a71a03350fb049420d
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
