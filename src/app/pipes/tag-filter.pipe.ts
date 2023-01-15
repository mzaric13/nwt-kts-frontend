import { Pipe, PipeTransform } from '@angular/core';
import { TagDTO } from '../models/tag-dto';

@Pipe({
  name: 'tagFilter',
})
export class TagFilterPipe implements PipeTransform {
  transform(value: TagDTO[], search: string): TagDTO[] {
    if (!search) {
      return [];
    }
    return value.filter((v) => {
      if (!v) {
        return;
      }
      return v.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }
}
