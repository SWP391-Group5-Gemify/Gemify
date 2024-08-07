import { Component, ViewChild } from '@angular/core';
import { GenericDropdownComponent } from '../../generic-dropdown/generic-dropdown.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { GenericSearchComponent } from '../../generic-search/generic-search.component';
import { catchError, map, Observable } from 'rxjs';
import {
  PromotionModel,
  PromotionParams,
  PromotionStatusEnum,
} from '../../../../core/models/promotion.model';
import { PromotionService } from '../../../../core/services/promotion/promotion.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { PaginationModel } from '../../../../core/models/pagination.model';
import { DropdownModel } from '../../../../core/models/dropdown.model';
import { CardPromotionComponent } from './card-promotion/card-promotion.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  ModalConfigModel,
  ModalModeEnum,
  ModalTitle,
} from '../../../../core/models/modal.model';
import { MatDialog } from '@angular/material/dialog';
import { ModalCreatePromotionComponent } from './modal-create-promotion/modal-create-promotion.component';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { RoleEnum } from '../../../../core/models/role.model';

@UntilDestroy()
@Component({
  selector: 'app-promotions',
  standalone: true,
  templateUrl: './promotions.component.html',
  styleUrl: './promotions.component.scss',
  imports: [
    CommonModule,
    MatCardModule,
    MatPaginatorModule,
    MatIcon,
    GenericSearchComponent,
    GenericDropdownComponent,
    CardPromotionComponent,
  ],
})
export class PromotionsComponent {
  // ==========================================
  // == Fields
  // ==========================================
  public promotions$!: Observable<PromotionModel[]>;
  public promotionsStatusDropdown: DropdownModel[] = [
    {
      name: 'Còn Hiệu Lực',
      value: PromotionStatusEnum.Active,
    },
    {
      name: 'Đã Hết Hạn',
      value: PromotionStatusEnum.Expired,
    },
  ];
  public promotionParams: PromotionParams = {
    pageIndex: 0,
    pageSize: 10,
    searchName: undefined,
    status: undefined,
  };
  public totalPromotions: number = 0;
  public pageEvent!: PageEvent;

  @ViewChild('promotionsStatusDropdownRef')
  promotionsStatusDropdownRef!: GenericDropdownComponent;
  @ViewChild('nameSearchInputRef') nameSearchInputRef!: GenericSearchComponent;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // ====================
  // == Life Cycle
  // ====================
  constructor(
    private promotionService: PromotionService,
    private notificationService: NotificationService,
    public viewModal: MatDialog,
    public userService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadPromotions();
  }

  // ====================
  // == Methods
  // ====================

  /**
   * Only StoreManager and StoreOwner can add new promotion
   * @returns
   */
  public isStoreOwner(): boolean {
    return this.userService.currentUser()?.role === RoleEnum.StoreOwner;
  }

  /**
   * Load promotions based on pagination
   */
  public loadPromotions() {
    this.promotions$ = this.promotionService
      .getPromotions({
        ...this.promotionParams,
        pageIndex: this.promotionParams.pageIndex + 1,
      })
      .pipe(
        map((response: PaginationModel<PromotionModel>) => {
          this.promotionParams.pageIndex = response.pageIndex - 1;
          this.promotionParams.pageSize = response.pageSize;
          this.totalPromotions = response.count;
          return response.data;
        }),
        catchError((error) => {
          console.error('Error loading promotions', error);
          throw error;
        })
      );
  }

  /**
   * Apply paginator on changing a page
   * @param e
   */
  public onPageChange(e: PageEvent) {
    this.promotionParams.pageIndex = e.pageIndex;
    this.promotionParams.pageSize = e.pageSize;
    this.loadPromotions();
  }

  /**
   * Filter the product by names
   * @param valueChanged
   */
  public onValueChangesNameFromParent(valueChanged: any) {
    this.promotionParams.searchName = valueChanged;
    this.onResetPaginatorToFirstPage();
    this.loadPromotions();
  }

  /**
   * Select the Sort by Promotion Status
   * @param event
   */
  public onSelectChangeStatusFromParent(event: any) {
    this.promotionParams.status = event?.value;
    this.onResetPaginatorToFirstPage();
    this.loadPromotions();
  }

  /**
   * Reset paginator to the first page after filtering
   */
  public onResetPaginatorToFirstPage() {
    this.promotionParams.pageIndex = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  /**
   * Reset all filters and load the default products
   */
  public onResetFilters() {
    this.promotionsStatusDropdownRef.onClearSelection();
    this.nameSearchInputRef.onClearInputFilter();
    this.promotionParams.searchName = undefined;
    this.promotionParams.status = undefined;
    this.loadPromotions();
  }

  /**
   * Disable the promotion by Id by set status = false
   * @param id
   */
  public onDisablePromotionByIdFromParent(id: number | string) {
    this.promotionService
      .disablePromotion(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (_) => {
          this.loadPromotions();
          this.notificationService.show('Đóng khuyến mãi thành công');
        },

        error: (_) => {
          this.notificationService.show('Có lỗi xảy ra, vui lòng thử lại');
        },
      });
  }

  /**
   * Open Modal to add promotion
   */
  onOpenModalAddPromotion() {
    const modalData: ModalConfigModel = {
      title: ModalTitle.CreatePromotionTitle,
      mode: ModalModeEnum.Create,
      closeButtonLabel: 'Đóng',
      saveButtonLabel: 'Tạo mới',
    };

    this.viewModal
      .open(ModalCreatePromotionComponent, {
        disableClose: true,
        width: '40%',
        height: '80%',
        enterAnimationDuration: '300ms',
        exitAnimationDuration: '300ms',
        data: modalData,
      })
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (_) => {
          this.loadPromotions();
        },
      });
  }
}
