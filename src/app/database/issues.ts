import Issue from './../types/Issue';
import StatusEnum from './../types/StatusEnum';
import PriorityEnum from './../types/PriorityEnum';
import labels from './labels';

const issues: Issue[] = [
  {
    id: '1',
    summary: 'Fix login bug',
    description: 'Resolve the issue preventing users from logging in.',
    status: StatusEnum.ToDo,
    projectId: '1',
    assigneeId: '2',
    labels: [labels[0], labels[3]],
    parentNodeId: null,
    childrenNodeIds: [],
    storyPoints: 3,
    priority: PriorityEnum.High,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    summary: 'Add feature toggle for dark mode',
    description: 'Implement a feature toggle to enable or disable dark mode.',
    status: StatusEnum.InProgress,
    projectId: '1',
    assigneeId: '1',
    labels: [labels[1], labels[8]],
    parentNodeId: null,
    childrenNodeIds: [],
    storyPoints: 5,
    priority: PriorityEnum.Medium,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    summary: 'Optimize database queries',
    description: 'Improve performance by optimizing database queries.',
    status: StatusEnum.Pending,
    projectId: '2',
    assigneeId: '3',
    labels: [labels[5], labels[6]],
    parentNodeId: null,
    childrenNodeIds: [],
    storyPoints: 8,
    priority: PriorityEnum.High,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    summary: 'Fix UI layout issue on mobile',
    description: 'Resolve layout issues visible on mobile devices.',
    status: StatusEnum.ToDo,
    projectId: '1',
    assigneeId: '4',
    labels: [labels[2], labels[4]],
    parentNodeId: null,
    childrenNodeIds: [],
    storyPoints: 2,
    priority: PriorityEnum.Low,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '5',
    summary: 'Write unit tests for authentication module',
    description: 'Improve code coverage by writing unit tests.',
    status: StatusEnum.Completed,
    projectId: '2',
    assigneeId: '5',
    labels: [labels[9], labels[18]],
    parentNodeId: null,
    childrenNodeIds: [],
    storyPoints: 4,
    priority: PriorityEnum.Medium,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '6',
    summary: 'Implement CI/CD pipeline',
    description: 'Set up automated CI/CD for deployment.',
    status: StatusEnum.InProgress,
    projectId: '3',
    assigneeId: '6',
    labels: [labels[10], labels[11]],
    parentNodeId: null,
    childrenNodeIds: [],
    storyPoints: 6,
    priority: PriorityEnum.High,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '7',
    summary: 'Create API documentation',
    description: 'Document all public API endpoints.',
    status: StatusEnum.Pending,
    projectId: '2',
    assigneeId: '7',
    labels: [labels[12], labels[15]],
    parentNodeId: null,
    childrenNodeIds: [],
    storyPoints: 5,
    priority: PriorityEnum.Medium,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '8',
    summary: 'Migrate legacy code to TypeScript',
    description: 'Convert legacy JavaScript code into TypeScript.',
    status: StatusEnum.ToDo,
    projectId: '1',
    assigneeId: '8',
    labels: [labels[1], labels[13]],
    parentNodeId: null,
    childrenNodeIds: [],
    storyPoints: 8,
    priority: PriorityEnum.High,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '9',
    summary: 'Fix broken deployment pipeline',
    description: 'Investigate the broken deployment webhook and fix it.',
    status: StatusEnum.ToDo,
    projectId: '3',
    assigneeId: '9',
    labels: [labels[11], labels[14]],
    parentNodeId: null,
    childrenNodeIds: [],
    storyPoints: 6,
    priority: PriorityEnum.High,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '10',
    summary: 'Implement password strength validator',
    description: 'Add validation for strong passwords.',
    status: StatusEnum.Completed,
    projectId: '2',
    assigneeId: '10',
    labels: [labels[0], labels[2]],
    parentNodeId: null,
    childrenNodeIds: [],
    storyPoints: 2,
    priority: PriorityEnum.Low,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add 20 more issues with different combinations of summary, description,
  // status, labels, priorities, etc.
  {
    id: '11',
    summary: 'Design a new onboarding flow',
    description: 'Simplify user onboarding for better retention.',
    status: StatusEnum.InProgress,
    projectId: '1',
    assigneeId: '2',
    labels: [labels[19], labels[4]],
    parentNodeId: null,
    childrenNodeIds: [],
    storyPoints: 4,
    priority: PriorityEnum.Medium,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '12',
    summary: 'Fix session timeout issue',
    description: 'Adjust session expiration for better user experience.',
    status: StatusEnum.Pending,
    projectId: '2',
    assigneeId: '3',
    labels: [labels[5], labels[9]],
    parentNodeId: null,
    childrenNodeIds: [],
    storyPoints: 2,
    priority: PriorityEnum.High,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '13',
    summary: 'Upgrade Node.js version',
    description: 'Migrate the system to use the latest LTS version of Node.js.',
    status: StatusEnum.ToDo,
    projectId: '3',
    assigneeId: '4',
    labels: [labels[0], labels[10]],
    parentNodeId: null,
    childrenNodeIds: [],
    storyPoints: 3,
    priority: PriorityEnum.Medium,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Keep going until you have 30 completely defined issues...
];

export default issues;
