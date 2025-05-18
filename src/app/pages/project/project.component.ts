import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {DatePipe} from '@angular/common';
import {Subscription} from 'rxjs';

import {IssueFormatPipe} from '../../shared/pipes/issue-format.pipe';

import Project from './../../types/Project';
import Issue from './../../types/Issue';
import {ProjectService} from '../../services/project.service';
import {IssueService} from '../../services/issue.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  imports: [DatePipe, RouterModule, IssueFormatPipe],
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit, OnDestroy {
  project!: Project;
  relatedIssues: Issue[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private issueService: IssueService,
  ) {
  }

  ngOnInit(): void {
    const paramSub = this.route.paramMap.subscribe((params) => {
      const projectId = params.get('id');
      if (projectId) {
        let foundProject: Project | null = null;
        this.projectService.getProjectById(projectId).subscribe(project => {
          foundProject = project;
          if (!foundProject) {
            this.router.navigate(["/"]).then(() => {
              console.warn("Project not found, redirected to home.");
            });
            return;
          }

          this.project = foundProject;
          this.issueService.getIssuesByProjectId(projectId).subscribe(issues => {
            this.relatedIssues = issues as Issue[];
          })

          // this.relatedTeam = teams.find((team) => team.id === this.project.teamId)!;
          //
          // this.relatedUsers = users.filter((user) =>
          //   user.teamIds?.includes(this.relatedTeam.id ? this.relatedTeam.id : '')
          // );
        });
      }
    });

    this.subscription.add(paramSub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
