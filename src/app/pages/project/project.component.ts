import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DatePipe} from '@angular/common';

import projects from './../../database/projects';
import issues from './../../database/issues';
import teams from './../../database/teams';

import users from './../../database/users';
import Project from './../../types/Project';
import Team from './../../types/Team';
import User from './../../types/User';
import Issue from './../../types/Issue';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  imports: [DatePipe],
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  project!: Project;
  relatedIssues: Issue[] = [];
  relatedTeam!: Team;
  relatedUsers: User[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const projectId = params.get('id');

      if (projectId) {
        this.project = projects.find((proj) => proj.id === projectId)!;

        this.relatedIssues = issues.filter((issue) => issue.projectId === projectId);

        this.relatedTeam = teams.find((team) => team.id === this.project.teamId)!;

        this.relatedUsers = users.filter((user) =>
          user.teamIds?.includes(this.relatedTeam.id)
        );

      }
    });
  }
}
