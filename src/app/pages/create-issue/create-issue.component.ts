import {Component, OnInit} from '@angular/core';
import {MatOption} from '@angular/material/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatTooltip} from '@angular/material/tooltip';
import {MatButton} from '@angular/material/button';
import {FormatDev} from '../../shared/pipes/dev.pipe';
import StatusEnum from '../../types/StatusEnum';
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
import {ProjectService} from '../../services/project.service';
import {IssueService} from '../../services/issue.service';


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

export class CreateIssueComponent implements OnInit {
  createIssueForm!: FormGroup;
  issueEnumKeys: string[] | undefined;
  protected projects: Project[] = [];
  users: User[] = users;
  labels: Label[] = labels;
  issues: Issue[] = issues;
  teams: Team[] = teams;


  constructor(
    private fb: FormBuilder,
    public projectService: ProjectService,
    private issueService: IssueService,
  ) {
    this.projectService.getMyProjects().subscribe(projects => {
      this.projects = projects as Project[]
    });
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

      const newIssue = {
        ...this.createIssueForm.value,
      };
      try {
        this.issueService.createIssue(newIssue).then(ignored => {
          alert('Issue successfully created!');
        })
      } catch (error) {
        console.error('Failed to create Issue: ', error);
      }
      this.createIssueForm.reset({
        status: 'TODO',
        storyPoints: 0
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

  protected readonly StatusEnum = StatusEnum;
}
