import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  NgxScannerQrcodeModule,
  NgxScannerQrcodeComponent,
  ScannerQRCodeResult,
} from 'ngx-scanner-qrcode';
import {
  ScannerQRCodeConfig,
  NgxScannerQrcodeService,
} from 'ngx-scanner-qrcode';
import { ProductService } from '../../../core/services/product/product.service';
import { BasketService } from '../../../core/services/basket/basket.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-barcode-scanner',
  standalone: true,
  imports: [NgxScannerQrcodeModule, CommonModule, MatIconModule],
  templateUrl: './barcode-scanner.component.html',
  styleUrl: './barcode-scanner.component.scss',
})
export class BarcodeScannerComponent {
  // ==========================================
  // == Fields
  // ==========================================

  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth,
      },
    },
  };

  @ViewChild('action') action!: NgxScannerQrcodeComponent;
  scannedValue: string = '';

  // ==========================================
  // == Lifecycle
  // ==========================================
  constructor(
    private productService: ProductService,
    private basketService: BasketService
  ) {}

  ngAfterViewInit(): void {
    this.action.isReady.pipe(untilDestroyed(this)).subscribe((res: any) => {});
  }

  // ==========================================
  // == Methods
  // ==========================================
  //Get product id from the barcode and add to basket
  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    console.log(e[0].value);
    this.scannedValue = e[0].value;
    let productId = Number(this.scannedValue);
    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.basketService.addProductItemToCurrentSellBasket(product, 1);
      },
      error: (error) => console.log(error),
    });
    this.action.stop();
  }
}
