import {Component, OnInit} from '@angular/core';
import {MatOption} from '@angular/material/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatTooltip} from '@angular/material/tooltip';
import {MatButton} from '@angular/material/button';
import {FormatDev} from '../../shared/pipes/dev.pipe';
import StatusEnum from '../../types/StatusEnum';
import projects from '../../database/projects';
import users from '../../database/users';
import labels from '../../database/labels';
import issues from '../../database/issues';
import teams from '../../database/teams';
import User from '../../types/User';
import Label from '../../types/Label';
import Issue from '../../types/Issue';
import Team from '../../types/Team';
import Project from '../../types/Project';
import PriorityEnum from '../../types/PriorityEnum';
import IssueTypeEnum from './../../types/IssueTypeEnum';


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
    ReactiveFormsModule,
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

export class CreateIssueComponent implements OnInit {
  createIssueForm!: FormGroup;
  issueEnumKeys: string[] | undefined;
  projects: Project[] = projects;
  users: User[] = users;
  labels:  Label[] = labels;
  issues: Issue[] = issues;
  teams: Team[] = teams;


  constructor(private fb: FormBuilder) {
    this.issueEnumKeys = Object.values(IssueTypeEnum) as string[];
  }

  ngOnInit(): void {
    this.createIssueForm = this.fb.group({
      summary: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      status: [StatusEnum.ToDo, [Validators.required]],
      projectId: ['', [Validators.required]],
      assigneeId: [''],
      issueType: [IssueTypeEnum.Task, [Validators.required]],
      labels: [[]],
      parentNodeId: [''],
      storyPoints: [0, [Validators.min(0)]],
      priority: [PriorityEnum.Low]
    });
  }

  createIssue(): void {
    if (this.createIssueForm.valid) {
      const newId = (this.issues.length + 1).toString();

      const newIssue = {
        id: newId,
        ...this.createIssueForm.value,
        createdAt: new Date(),
        lastUpdated: new Date()
      };

      this.issues.push(newIssue);

      this.createIssueForm.reset({
        status: 'TODO',
        storyPoints: 0
      });
      console.log(this.issues)
      alert('Issue successfully created!');
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

  protected readonly StatusEnum = StatusEnum;
}
