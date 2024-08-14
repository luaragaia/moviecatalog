import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorTratament',
  standalone: true
})
export class ErrorTransformPipe implements PipeTransform {
  transform(posterPath: string | null): string {
    const defaultImagePath = '../../../assets/error-poster.png';
    const basePath = 'https://image.tmdb.org/t/p/w500null';
    return posterPath ? `${basePath}${posterPath}` : defaultImagePath;
  }
}
