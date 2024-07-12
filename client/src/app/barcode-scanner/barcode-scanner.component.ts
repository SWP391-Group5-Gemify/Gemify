import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NgxScannerQrcodeModule, LOAD_WASM, NgxScannerQrcodeComponent, ScannerQRCodeResult  } from 'ngx-scanner-qrcode';
import { ScannerQRCodeConfig, NgxScannerQrcodeService, ScannerQRCodeSelectedFiles} from 'ngx-scanner-qrcode';
import { ProductService } from '../core/services/product/product.service';
import { BasketService } from '../core/services/basket/basket.service';

@Component({
  selector: 'app-barcode-scanner',
  standalone: true,
  imports: [NgxScannerQrcodeModule, CommonModule, MatIconModule],
  templateUrl: './barcode-scanner.component.html',
  styleUrl: './barcode-scanner.component.scss'
})
export class BarcodeScannerComponent {
  public config: ScannerQRCodeConfig = {
    constraints: {
      video: {
        width: window.innerWidth
      },
    },
  };
  
  @ViewChild('action') action!: NgxScannerQrcodeComponent;
  scannedValue: string = '';
  
  constructor(private qrcode: NgxScannerQrcodeService, 
    private productService: ProductService, private basketService: BasketService) { }
  
  ngAfterViewInit(): void {
    this.action.isReady.subscribe((res: any) => {
    });
  }

  //Get product id from the barcode and add to basket
  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    console.log(e[0].value);
    this.scannedValue = e[0].value;
    let productId = Number(this.scannedValue);
    this.productService.getProductById(productId).subscribe({
      next: product => {
        this.basketService.addItemToCurrentBasket(product, 1);
      },
      error: error => console.log(error)
    });
    this.action.stop();
  }
}
