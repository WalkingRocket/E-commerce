import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'term'
})
export class TermPipe implements PipeTransform {

  transform(value: string, count: number): string {
    return value.split(' ').slice(0, count).join(' ') + (value.split(' ').length > count ? '...' : '');
  }

}
