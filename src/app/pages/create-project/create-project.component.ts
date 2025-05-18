import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import users from '../../database/users';
import teams from '../../database/teams';
import Project from '../../types/Project';
import {ProjectService} from '../../services/project.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-create-project',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent implements OnInit {
  createProjectForm!: FormGroup;
  protected projects: Project[] = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private projectService: ProjectService,
  ) {
    this.projectService.getMyProjects().subscribe(projects => {
      this.projects = projects as Project[]
    });
  }


  ngOnInit(): void {
    this.createProjectForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      dueDate: [new Date(), [Validators.required]],
      teamId: ['', Validators.required],
      ownerId: ['', Validators.required],
      status: ['InProgress', Validators.required],
      storyPoints: [0, [Validators.required, Validators.min(0)]],
    });
  }


  createProject(): void {
    if (this.createProjectForm.valid) {
      const newProject = {
        ...this.createProjectForm.value,
        dueDate: new Date(this.createProjectForm.value.dueDate),
        issues: [],
        createdAt: new Date(),
        lastUpdate: new Date(),
      };

      try {
        this.projectService.createProject(newProject).then(ignored => {
          alert('Project successfully created!');
          this.projectService.getMyProjects().subscribe(projects => {
            this.projects = projects as Project[];
          });

        })
      } catch (error) {
        console.error('Failed to create project: ', error);
      }
    } else {

      alert('Please fill in all required fields correctly.');
    }
  }

  protected readonly users = users;
  protected readonly teams = teams;
}
