import { Component } from '@angular/core';
import projects from '../../database/projects';
import {FormsModule} from '@angular/forms';
import users from '../../database/users';
import teams from '../../database/teams';
import StatusEnum from '../../types/StatusEnum';

@Component({
  selector: 'app-create-project',
  imports: [
    FormsModule
  ],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  newProject = {
    id: '',
    name: '',
    description: '',
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    createdAt: new Date(),
    lastUpdate: new Date(),
    teamId: '',
    ownerId: '',
    status: StatusEnum.Pending,
    storyPoints: 0,
    issues: [],
  };

  projects = projects;

  createProject(): void {
    this.newProject.id = (this.projects.length + 1).toString();

    this.projects.push({...this.newProject});
    this.newProject = {
      id: '',
      name: '',
      description: '',
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      teamId: '',
      ownerId: '',
      status: StatusEnum["InProgress"],
      storyPoints: 0,
      issues: [],
      createdAt: new Date(),
      lastUpdate: new Date(),
    };

    alert('Project successfully created!');
  }

  protected readonly users = users;
  protected readonly teams = teams;
}
