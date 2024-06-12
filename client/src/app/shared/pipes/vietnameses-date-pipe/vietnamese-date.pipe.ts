import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vietNameseDatePipe',
  standalone: true,
})
export class VietNameseDatePipe implements PipeTransform {
  private readonly monthNumbers: string[] = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];

  transform(value: Date | string | null): unknown {
    if (!value) return '';
    const date = new Date(value);
    const day: number = date.getDate();
    const month: number = date.getMonth();
    const year: number = date.getFullYear();
    return `ngày ${day} tháng ${this.monthNumbers[month]} năm ${year}`;
  }
}
