import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CreateUpdateDeleteResponseModel } from '../../models/response.model';
@Component({
  selector: 'app-page-error',
  standalone: true,
  imports: [],
  templateUrl: './page-error.component.html',
  styleUrl: './page-error.component.scss',
})
export class PageErrorComponent implements OnInit {
  errorData!: CreateUpdateDeleteResponseModel;
  constructor(
    private router: ActivatedRoute,
    private routeLocation: Location
  ) {}

  ngOnInit(): void {
    this.errorData = this.router.snapshot
      .data as CreateUpdateDeleteResponseModel;
  }

  // TODO: Fix error on go back to the guarded routes
  onGoBack(): void {
    this.routeLocation.back();
  }
}
