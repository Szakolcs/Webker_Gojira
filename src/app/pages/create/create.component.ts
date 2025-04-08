import {Component} from '@angular/core';
import {MatOption} from '@angular/material/core';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatSelect} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {MatTooltip} from '@angular/material/tooltip';
import {MatButton} from '@angular/material/button';
import {FormatDev} from '../../shared/pipes/dev.pipe';

interface Project {
  name: string;
  description: string;
  lastUpdated: Date;
}

interface Team {
  id: string,
  devs: Dev[];
}

interface Dev {
  name: string;
  email: string;
  skillLevel: "beginner" | "intermediate" | "advanced" | string
}

enum IssueType {
  STORY = "Story",
  BUG = "Bug",
  TASK = "Task",
  EPIC = "Epic"
}

interface Label {
  name: string;
  color: string;
}
interface Issue {
  id: string,
  project: Project;
  issueType: IssueType;
  summary: string;
  description: string;
  status: string;
  dev: Dev;
  labels: Label[];
  storyPoint: number;
}

@Component({
  selector: 'app-create',
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
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})

// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

export class CreateComponent {
  issueEnum: typeof IssueType = IssueType;
  issueEnumKeys: string[] | undefined; // Array of the keys of Enum
  constructor() {
    this.issueEnumKeys = Object.values(this.issueEnum) as string[];
    this.selectedProject = this.projects[0]
    this.selectedIssueType = "";
    this.summary = ""
    this.selectedStatus = "TODO"
  }

  projects = [
    {name: 'Project Alpha', description: 'Building a new Alpha system', lastUpdated: new Date()},
    {name: 'Project Beta', description: 'Improving Beta features', lastUpdated: new Date()},
    {name: 'Project Gamma', description: 'Revamping Gamma design', lastUpdated: new Date()},
  ]
  devs = [
    {name: 'szaki', email: 'szaki@vagyok.org', skillLevel: "beginner"},
    {name: 'akos', email: 'aki@vagyok.org', skillLevel: "intermediate"},
    {name: 'dafe', email: 'dafi@vagyok.org', skillLevel: "advanced"},
    {name: 'kopi', email: 'kopi@vagyok.org', skillLevel: "intermediate"},
  ]
  issues: Issue[] | any = [
    {
      id: '0',
      project: {
        id: 'proj-000',
        name: 'Project Omega',
      },
      issueType: IssueType.EPIC,
      summary: 'Create cool app',
      description: 'Very cool app that will make you happy.',
      status: 'To Do',
      dev: {
        name: 'John Doe Johnson',
        email: 'johndoe.johnson@example.com',
      },
      labels: [
        {name: 'Important', color: 'purple'},
        {name: 'FullStack', color: 'pink'},
      ],
      storyPoint: 50,
    },
    {
      id: '1',
      project: {
        id: 'proj-001',
        name: 'Project Alpha',
      },
      issueType: IssueType.BUG,
      summary: 'Fix login page error',
      description: 'Users are unable to log in due to a backend authentication service timeout.',
      status: 'To Do',
      dev: {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
      },
      labels: [
        {name: 'Urgent', color: 'red'},
        {name: 'Backend', color: 'blue'},
      ],
      storyPoint: 5,
    },
    {
      id: '2',
      project: {
        id: 'proj-002',
        name: 'Project Beta',
      },
      issueType: IssueType.STORY,
      summary: 'Add dark mode functionality',
      description: 'Implement a dark mode theme toggle for better user experience.',
      status: 'In Progress',
      dev: {
        name: 'John Smith',
        email: 'john.smith@example.com',
      },
      labels: [
        {name: 'UI/UX', color: 'yellow'},
        {name: 'Frontend', color: 'orange'},
      ],
      storyPoint: 8,
    },
    {
      id: '3',
      project: {
        id: 'proj-003',
        name: 'Project Gamma',
      },
      issueType: IssueType.TASK,
      summary: 'Migrate database to new server',
      description: 'Move the existing database to the newly set up AWS RDS instance.',
      status: 'Done',
      dev: {
        name: 'Emma Brown',
        email: 'emma.brown@example.com',
      },
      labels: [
        {name: 'Database', color: 'gray'},
        {name: 'Backend', color: 'blue'},
      ],
      storyPoint: 13,
    },
  ];
  labels = [
    {name: 'Urgent', color: 'red'},
    {name: 'Backend', color: 'blue'},
    {name: 'Database', color: 'gray'},
    {name: 'UI/UX', color: 'yellow'},
    {name: 'Frontend', color: 'orange'},
  ]

  teams: Team[] = [
    {
      id: "team-1",
      devs: [
        { name: "Alice Johnson", email: "alice.johnson@example.com", skillLevel: "advanced" },
        { name: "Bob Smith", email: "bob.smith@example.com", skillLevel: "intermediate" },
      ],
    },
    {
      id: "team-2",
      devs: [
        { name: "Charlie Brown", email: "charlie.brown@example.com", skillLevel: "beginner" },
        { name: "Diana Prince", email: "diana.prince@example.com", skillLevel: "advanced" },
      ],
    },
    {
      id: "team-3",
      devs: [
        { name: "Eve Adams", email: "eve.adams@example.com", skillLevel: "intermediate" },
        { name: "Frank Wright", email: "frank.wright@example.com", skillLevel: "beginner" },
      ],
    },
  ];

  selectedProject: Project;
  selectedIssueType: string = "None";
  selectedStatus: string = "TODO";
  summary: string = "";
  selectedDev: string = "";
  storyPoint: string = "";
  description: string = "";
  selectedParent: any;
  selectedLabels: any = [];
  selectedTeam: any;

  createIssue() {
    console.log(" hehe ");
  }
}
