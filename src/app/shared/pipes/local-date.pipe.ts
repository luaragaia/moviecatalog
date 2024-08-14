import { PipeTransform, Pipe } from '@angular/core';
import moment from 'moment';

@Pipe({
    name: 'localDateTimePipe',
    standalone: true
})
export class LocalDateTimePipe implements PipeTransform {
  transform(date: string): string {
    if (!date) {
      return 'Data indisponível';
    }

    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };

    let formattedDate = new Date(date).toLocaleDateString('pt-BR', options);

    formattedDate = formattedDate.replace(/de /g, '').replace('.', '').replace('dec', 'DEZ').toUpperCase();

    return formattedDate;
  }
}
