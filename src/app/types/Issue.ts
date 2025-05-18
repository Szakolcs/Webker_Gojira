import Label from './Label';
import StatusEnum from './StatusEnum';
import PriorityEnum from './PriorityEnum';
import IssueTypeEnum from './IssueTypeEnum';

interface Issue {
  id?: string;
  summary: string;
  description: string;
  status: StatusEnum;
  projectId: string;
  assigneeId: string;
  issueType: IssueTypeEnum
  labels: Label[];
  parentNodeId: string | null;
  storyPoints: number;
  priority: PriorityEnum;
  createdAt: Date;
  updatedAt: Date;
}

export default Issue;
