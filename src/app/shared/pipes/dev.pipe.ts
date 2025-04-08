import { Pipe, PipeTransform } from '@angular/core';

interface Dev {
  name: string;
  email: string;
  skillLevel: "beginner" | "intermediate" | "advanced" | string

}

@Pipe({
  name: 'devFormatter',
  standalone: true
})

export class FormatDev implements PipeTransform {
  transform(value: Dev): string {
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
