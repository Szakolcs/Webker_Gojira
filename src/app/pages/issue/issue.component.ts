import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/input';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { FormatDev } from '../../shared/pipes/dev.pipe';

import issues from '../../database/issues';
import users from '../../database/users';

import Issue from '../../types/Issue';
import User from '../../types/User';
import Project from '../../types/Project';
import StatusEnum from '../../types/StatusEnum';
import {IssueService} from '../../services/issue.service';
import {ProjectService} from '../../services/project.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css'],
  imports: [
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatButton,
    ReactiveFormsModule,
    DatePipe,
    FormatDev
  ],
  standalone: true
})
export class IssueComponent implements OnInit {
  issue!: Issue;
  project!: Project;
  assignee?: User;
  statusForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private issueService: IssueService,
    private projectService: ProjectService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const issueId = params.get('id');
      if (issueId) {
        this.issueService.getIssuesById(issueId).subscribe(
          (issue) => {
            console.log('az mar valami', issueId);
            if (!issue) {
              this.router.navigate(['/']).then(r => {});
              return;
            }
            this.issue = issue as Issue;
            this.projectService.getProjectById(this.issue.projectId).subscribe(
              (project) => {
                this.project = project as Project;
              }
            )
            this.assignee = users.find((user) => user.id === this.issue.assigneeId);
          }
        )

        this.statusForm = this.fb.group({
          status: [this.issue.status, Validators.required]
        });
      }
    });
  }

  updateStatus(): void {
    if (this.statusForm.valid) {
      const newStatus = this.statusForm.get('status')?.value;
      if (newStatus) {
        const issueIndex = issues.findIndex(i => i.id === this.issue.id);
        if (issueIndex !== -1) {
          issues[issueIndex].status = newStatus;
          issues[issueIndex].updatedAt = new Date();
          this.issue = issues[issueIndex];
          alert('Issue status updated successfully!');
        }
      }
    }
  }

  goBack(): void {
    this.router.navigate(['/projects', this.project.id]).then(r => {});
  }

  get statusOptions(): string[] {
    return Object.values(StatusEnum);
  }

  get priorityLabel(): string {
    return this.issue.priority;
  }

  get issueTypeLabel(): string {
    return this.issue.issueType;
  }

  getParentIssueSummary(): string {
    if (!this.issue.parentNodeId) return '';
    const parentIssue = issues.find(i => i.id === this.issue.parentNodeId);
    return parentIssue ? parentIssue.summary : 'Unknown';
  }
}
