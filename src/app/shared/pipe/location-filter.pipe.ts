import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'locationFilter',
})
export class LocationFilterPipe implements PipeTransform {
  transform(value: string[], search: string): string[] {
    if (!search) {
      return [];
    }
    return value.filter((v) => {
      if (!v) {
        return;
      }
      return v.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }
}
