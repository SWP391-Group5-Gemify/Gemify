import { inject, Injectable } from '@angular/core';
import { OrderModel, OrderItemModel } from '../../models/order.model';
import jsPDFInvoiceTemplate, {
  OutputType,
  jsPDF,
} from 'jspdf-invoice-template';
import '../../../../assets/fonts/Roboto-Regular-normal';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class InvoiceGeneratorService {
  // ========================
  // == Fields
  // ========================

  // ========================
  // == Constructors
  // ========================
  constructor(private datePipe: DatePipe) {}

  // ========================
  // == Methods
  // ========================

  /**
   * A function to generate pdf invoice
   * @param order
   * @param orderItems
   * @param fileName
   */
  public generateInvoice(
    order: OrderModel,
    orderItems: OrderItemModel[],
    fileName: string
  ): void {
    jsPDFInvoiceTemplate({
      outputType: OutputType.Save,
      onJsPDFDocCreation: (jsPDFDoc: jsPDF) => {
        jsPDFDoc.setFont('Roboto-Regular');
      },
      returnJsPDFDocObject: true,
      fileName: fileName,
      orientationLandscape: false,
      compress: true,
      logo: {
        src: '../../../../assets/images/logo.png',
        type: 'PNG', //optional, when src= data:uri (nodejs case)
        width: 53.33, //aspect ratio = width/height
        height: 8.66,
        margin: {
          top: 0, //negative or positive num, from the current position
          left: 0, //negative or positive num, from the current position
        },
      },
      stamp: {
        inAllPages: true,
        src: '../../../../assets/images/signature.png',
        width: 40, //aspect ratio = width/height
        height: 40,
        margin: {
          top: -70, //negative or positive num, from the current position
          left: 30, //negative or positive num, from the current position
        },
      },
      business: {
        name: 'CÔNG TY TNHH GEMIFY',
        address: '78- 80 Đường Trần Phú, Phường Lộc Thọ, Tp. Nha Trang',
        phone: '0397612888',
        email: 'Gemify@gmail.com',
        email_1: 'Gemify@gmail.com.vn',
        website: 'https://gemify.us.to',
      },
      contact: {
        label: 'THÔNG TIN KHÁCH HÀNG:',
        name: order.name,
        address: `Số Điện Thoại: ${order.phone}`,
        phone: `Điểm Thưởng Đơn Hàng: ${(order.total / 100000).toFixed(
          0
        )} điểm`,
        email: `Thành Viên: ${order.membershipName}`,
      },
      invoice: {
        label: 'SỐ HÓA ĐƠN #',
        num: order.id,
        invDate: `Ngày Thực Hiện Thanh Toán: ${this.datePipe.transform(
          order.orderDate,
          'dd/MM/yyyy hh:mm'
        )}`,
        invGenDate: `Ngày xuất hóa đơn: ${this.datePipe.transform(
          new Date(),
          'dd/MM/yyyy hh:mm'
        )}`,
        headerBorder: true,
        tableBodyBorder: true,
        header: [
          {
            title: '#',
            style: {
              width: 10,
            },
          },
          {
            title: 'Tên',
            style: {
              width: 35,
            },
          },
          {
            title: 'Loại Vàng',
          },
          { title: 'Giá Vàng' },
          { title: 'Cân Nặng Vàng' },
          {
            title: 'Đơn Vị',
            style: {
              width: 13,
            },
          },
          {
            title: 'Số Lượng',
            style: {
              width: 17,
            },
          },
          { title: 'Tổng Tiền' },
        ],
        table: Array.from(orderItems, (item, index) => [
          index + 1,
          item.productName,
          item.goldTypeName,
          item.goldPrice.toLocaleString('vi-VN', {
            minimumFractionDigits: 2,
          }),
          item.goldWeight,
          'Chỉ',
          item.quantity,
          (item.price * item.quantity).toLocaleString('vi-VN', {
            minimumFractionDigits: 2,
          }),
        ]),
        additionalRows: [
          {
            col1: 'Tổng Hóa Đơn:',
            col2: order.total.toLocaleString('vi-VN', {
              minimumFractionDigits: 2,
            }),
            col3: 'VND',
            style: {
              fontSize: 14, //optional, default 12
            },
          },
          {
            col1: 'Khuyến Mãi:',
            col2: (order.promotionDiscount * 100).toFixed(0),
            col3: '%',
            style: {
              fontSize: 10, //optional, default 12
            },
          },
          {
            col1: 'Giảm Giá Thành Viên:',
            col2: (order.membershipDiscount * 100).toFixed(0),
            col3: '%',
            style: {
              fontSize: 10, //optional, default 12
            },
          },
          {
            col1: 'Tổng tiền sản phẩm:',
            col2: order.subTotal.toLocaleString('vi-VN', {
              minimumFractionDigits: 2,
            }),
            col3: 'VND',
            style: {
              fontSize: 10, //optional, default 12
            },
          },
        ],
        invDescLabel: 'Lưu ý',
        invDesc:
          'Khách hàng vui lòng mang sản phẩm đến cửa hàng hoặc gửi qua đường bưu điện kèm theo hóa đơn mua hàng hoặc thẻ bảo hành. Nhân viên của chúng tôi sẽ kiểm tra sản phẩm và xác định điều kiện bảo hành. Nếu sản phẩm đủ điều kiện bảo hành, chúng tôi sẽ tiến hành sửa chữa hoặc thay thế trong vòng 15-30 ngày làm việc tùy thuộc vào mức độ hư hỏng.Nếu sản phẩm không đủ điều kiện bảo hành miễn phí, chúng tôi sẽ thông báo cho khách hàng về chi phí sửa chữa và thời gian dự kiến.',
      },
      footer: {
        text: 'Hóa đơn được tạo và có tính pháp lý tại cửa hàng của GEMIFY',
      },
      pageEnable: true,
      pageLabel: 'Trang ',
    });
  }
}
