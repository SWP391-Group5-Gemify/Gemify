import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NgxScannerQrcodeModule, LOAD_WASM, NgxScannerQrcodeComponent, ScannerQRCodeResult  } from 'ngx-scanner-qrcode';
import { ScannerQRCodeConfig, NgxScannerQrcodeService, ScannerQRCodeSelectedFiles} from 'ngx-scanner-qrcode';

@Component({
  selector: 'app-barcode-scanner',
  standalone: true,
  imports: [NgxScannerQrcodeModule, CommonModule],
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
  
  constructor(private qrcode: NgxScannerQrcodeService) { }
  
  ngAfterViewInit(): void {
    this.action.isReady.subscribe((res: any) => {
    });
  }
  
  public onEvent(e: ScannerQRCodeResult[], action?: any): void {
    console.log(e[0].value);
    this.scannedValue = e[0].value;
    this.action.stop();
  }
}
