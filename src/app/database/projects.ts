import Project from './../types/Project';
import StatusEnum from './../types/StatusEnum';

const projects: Project[] = [
  {
    id: '1',
    name: 'Project Apollo',
    description: 'A frontend revamp project',
    dueDate: new Date('2024-12-31'),
    createdAt: new Date(),
    lastUpdate: new Date(),
    teamId: '1',
    ownerId: '1',
    status: StatusEnum.InProgress,
    issues: [],
    storyPoints: 50,
  },
  {
    id: '2',
    name: 'Backend Optimization',
    description: 'Improve performance of backend services',
    dueDate: new Date('2024-09-30'),
    createdAt: new Date(),
    lastUpdate: new Date(),
    teamId: '2',
    ownerId: '3',
    status: StatusEnum.Pending,
    issues: [],
    storyPoints: 70,
  },
  {
    id: '3',
    name: 'Infrastructure Automation',
    description: 'Automate infrastructure deployment',
    dueDate: new Date('2024-06-30'),
    createdAt: new Date(),
    lastUpdate: new Date(),
    teamId: '3',
    ownerId: '5',
    status: StatusEnum.ToDo,
    issues: [],
    storyPoints: 100,
  },
];

export default projects;
