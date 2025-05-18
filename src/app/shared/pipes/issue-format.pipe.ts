import { Pipe, PipeTransform } from '@angular/core';
import Issue from '../../types/Issue';

@Pipe({
  name: 'issueFormat',
  standalone: true
})
export class IssueFormatPipe implements PipeTransform {
  transform(issue: Issue): string {
    if (!issue) return '';

    try {
      return `${issue.summary} (${issue.status})`;
    } catch (error) {
      return '';
    }
  }
}
