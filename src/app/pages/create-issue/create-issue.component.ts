import {Component} from '@angular/core';
import {MatOption} from '@angular/material/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatTooltip} from '@angular/material/tooltip';
import {MatButton} from '@angular/material/button';
import {FormatDev} from '../../shared/pipes/dev.pipe';
import Project from './../../types/Project'
import IssueTypeEnum from './../../types/IssueTypeEnum'
import StatusEnum from '../../types/StatusEnum';
import Projects from '../../database/projects';
import users from '../../database/users';
import labels from '../../database/labels';
import issues from '../../database/issues';
import teams from '../../database/teams';

@Component({
  selector: 'app-create-issue',
  imports: [
    MatOption,
    MatLabel,
    MatFormField,
    MatSelect,
    FormsModule,
    MatTooltip,
    MatInput,
    MatButton,
    FormatDev,
  ],
  templateUrl: './create-issue.component.html',
  styleUrl: './create-issue.component.css'
})

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

export class CreateIssueComponent {
  issueEnumKeys: string[] | undefined; // Array of the keys of Enum
  constructor() {
    this.issueEnumKeys = Object.values(IssueTypeEnum) as string[];
  }

  selectedProject: Project | null = null;
  selectedIssueType: string = "None";
  selectedStatus: string = StatusEnum.ToDo;
  summary: string = "";
  selectedDev: string = "";
  storyPoint: number = 0;
  description: string = "";
  selectedParent: any;
  selectedLabels: any = [];
  selectedTeam: any;

  createIssue() {
    console.log(" hehe ");
  }

  protected readonly projects = Projects;
  protected readonly users = users;
  protected readonly labels = labels;
  protected readonly issues = issues;
  protected readonly teams = teams;
}
