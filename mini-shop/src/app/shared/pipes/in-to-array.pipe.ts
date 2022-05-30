import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inToArray'
})
export class InToArrayPipe implements PipeTransform {

  transform(value: number): any {
    return new Array(value);
  }

}
