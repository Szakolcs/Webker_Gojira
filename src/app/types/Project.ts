import StatusEnum from './StatusEnum';
import Issue from './Issue';

interface Project {
  id?: string;
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
}
export default Project;
