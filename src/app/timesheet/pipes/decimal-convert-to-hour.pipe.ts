import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decimalConvertToHour'
})
export class DecimalConvertToHourPipe implements PipeTransform {

  transform(value: number): string {
    if (!value || isNaN(value)) return '0h00';

    const hours = Math.floor(value);
    const minutes = Math.round((value - hours) * 60);

    return `${hours}h${minutes.toString().padStart(2, '0')}`;
  }

}
