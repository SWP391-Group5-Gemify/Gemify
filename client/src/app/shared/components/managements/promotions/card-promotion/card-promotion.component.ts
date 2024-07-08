import { Component, input, output } from '@angular/core';
import {
  PromotionModel,
  PromotionStatusEnum,
} from '../../../../../core/models/promotion.model';
import { PromotionService } from '../../../../../core/services/promotion/promotion.service';
import { RoleEnum } from '../../../../../core/models/role.model';
import { AuthService } from '../../../../../core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CreateUpdateDeleteResponseModel } from '../../../../../core/models/response.model';
import { NotificationService } from '../../../../../core/services/notification/notification.service';

@Component({
  selector: 'app-card-promotion',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIconModule],
  templateUrl: './card-promotion.component.html',
  styleUrl: './card-promotion.component.scss',
})
export class CardPromotionComponent {
  // ======================================
  // == Fields
  // ======================================
  public PromotionStatusEnum = PromotionStatusEnum;
  public promotion = input.required<PromotionModel>();
  public onDisablePromotion = output<number>();
  // ======================================
  // == Life Cycle
  // ======================================
  constructor(
    private promotionService: PromotionService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  // ======================================
  // == Methods
  // ======================================

  /**
   * Only store owner can edit promotion
   * @returns
   */
  public isDisablePromotionMode(): boolean {
    const allowedDisableModeRole: RoleEnum[] = [RoleEnum.StoreOwner];
    return allowedDisableModeRole.includes(
      this.authService.currentUser()?.role!
    );
  }

  /**
   * Disable the promotion
   * TODO: Will add with confirmation dialog
   */
  public onDisablePromotionByIdFromChild() {
    this.onDisablePromotion.emit(this.promotion().id);
  }
}
