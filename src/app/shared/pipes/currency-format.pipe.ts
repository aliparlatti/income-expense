import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  standalone: true,
  name: 'currencyFormat'
})
@Injectable({
  providedIn: 'root',
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number | string, applyFormat: boolean): string {
    if (!applyFormat || value === null || value === undefined) {
      return value?.toString() || '';
    }

    const formattedValue = new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value));

    return formattedValue;
  }
}
