import { CommonModule } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'regexPhone'})
export class RegexPhonePipe implements PipeTransform {
  transform(value: string, ): string {
	const re = /"/gi;
    return value.replace(re , '');
  }
}


@NgModule({
	declarations: [RegexPhonePipe],
	imports: [CommonModule],
	exports: [RegexPhonePipe]
})

export class RegexPhonePipeModule{}