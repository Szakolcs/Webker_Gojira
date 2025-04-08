import StatusEnum from './StatusEnum';
import Issue from './Issue';

interface Project {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  createdAt: Date;
  lastUpdate: Date;
  teamId: string;
  ownerId: string;
  status: StatusEnum;
  issues: Issue[];
  storyPoints: number;

  getStoryPoints(): number;
  getActiveIssues(): Issue[];
  getIssuesByLabel(label: string): Issue[];
  getIssuesByStatus(status: StatusEnum): Issue[];
  getIssuesByPriority(priority: PriorityEnum): Issue[];
}
export default Project;
