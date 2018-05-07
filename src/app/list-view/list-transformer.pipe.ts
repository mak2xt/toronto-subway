import { Pipe, PipeTransform } from "@angular/core";
import { Station } from "@app/core";

@Pipe({
  name: "listTransformer"
})
export class ListTransformerPipe implements PipeTransform {
  transform(value: Station[], expanded: boolean): Station[] {
    if (expanded) {
      return value;
    }
    let newVal: Station[] = [];
    newVal.push(value[0]);
    newVal.push(
      ...value.filter(
        (el, index, arr) =>
          index !== 0 &&
          index !== arr.length - 1 &&
          el.line !== arr[index + 1].line
      )
    );
    newVal.push(value[value.length - 1]);
    return newVal;
  }
}
