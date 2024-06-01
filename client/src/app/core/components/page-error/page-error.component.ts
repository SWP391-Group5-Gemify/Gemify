import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RouteErrorResponse } from '../../models/route/error/route-error-response.model';
@Component({
  selector: 'app-page-error',
  standalone: true,
  imports: [],
  templateUrl: './page-error.component.html',
  styleUrl: './page-error.component.scss',
})
export class PageErrorComponent implements OnInit {
  errorData!: RouteErrorResponse;
  constructor(
    private router: ActivatedRoute,
    private routeLocation: Location
  ) {}

  ngOnInit(): void {
    this.errorData = this.router.snapshot.data as RouteErrorResponse;
  }

  onGoBack(): void {
    this.routeLocation.back();
  }
}
