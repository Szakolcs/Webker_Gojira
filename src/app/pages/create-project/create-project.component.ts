import {Component, OnInit} from '@angular/core';
import projects from '../../database/projects';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import users from '../../database/users';
import teams from '../../database/teams';



@Component({
  selector: 'app-create-project',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent implements OnInit{
  createProjectForm!: FormGroup;

  constructor(private fb: FormBuilder) {
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


  projects = projects;

  createProject(): void {
    if (this.createProjectForm.valid) {

      const newId = (this.projects.length + 1).toString();


      const newProject = {
        id: newId,
        ...this.createProjectForm.value,
        dueDate: new Date(this.createProjectForm.value.dueDate),
        issues: [],
        createdAt: new Date(),
        lastUpdate: new Date(),
      };


      this.projects.push(newProject);


      this.createProjectForm.reset({
        status: 'InProgress',
        storyPoints: 0,
      });


      alert('Project successfully created!');
    } else {

      alert('Please fill in all required fields correctly.');
    }
  }

  protected readonly users = users;
  protected readonly teams = teams;
}
