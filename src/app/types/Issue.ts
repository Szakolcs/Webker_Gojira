import Label from './Label';
import StatusEnum from './StatusEnum';
import PriorityEnum from './PriorityEnum';

interface Issue {
  id: string;
  summary: string;
  description: string;
  status: StatusEnum;
  projectId: string;
  assigneeId: string;
  labels: Label[];
  parentNodeId: string | null;
  childrenNodeIds: string[];
  storyPoints: number;
  priority: PriorityEnum;
  createdAt: Date;
  updatedAt: Date;
}

export default Issue;
