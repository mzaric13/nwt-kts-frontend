import { Pipe, PipeTransform } from '@angular/core';
import { TagDTO } from '../../shared/models/tag-dto';

@Pipe({
  name: 'tagFilterUsed',
})
export class TagFilterUsedPipe implements PipeTransform {
  transform(value: TagDTO[], selectedTags: TagDTO[]): TagDTO[] {
    if (!selectedTags) {
      return value;
    }
    return value.filter((v) => {
      if (!v) {
        return;
      }
      return selectedTags.indexOf(v) < 0;
    });
  }
}
