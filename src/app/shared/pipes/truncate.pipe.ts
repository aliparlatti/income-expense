import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: "truncate",
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string,
    limit = 50,
    completeWords = false,
    ellipsis = "..."
  ) {
    if (completeWords) {
      if (value.length <= limit) {
        return value;
      }
      const subString = value.substr(0, limit - ellipsis.length);
      return subString.substr(0, subString.lastIndexOf(" ")) + ellipsis;
    } else {
      return value.length > limit
        ? value.substring(0, limit) + ellipsis
        : value;
    }
  }
}
