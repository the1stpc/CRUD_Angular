import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(list: any[], fn: (item: any) => boolean): any[] {
    return list.filter(fn);
  }
}
