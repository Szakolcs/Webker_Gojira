import { Pipe, PipeTransform } from '@angular/core';
import User from '../../types/User';

@Pipe({
  name: 'devFormatter',
  standalone: true
})

export class FormatDev implements PipeTransform {
  transform(value: User): string {
    if (!value) return '';

    try {
      const dev = value;
      const name = dev.name;
      const email = dev.email;
      const skillLevel = dev.skillLevel;
      return `${email}  (${name} - ${skillLevel})`;

    } catch (error) {

      return value.name;
    }
  }
}
