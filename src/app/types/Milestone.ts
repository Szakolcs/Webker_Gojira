import StatusEnum from './StatusEnum';

interface Milestone {
  id: string;
  name: string;
  description: string;
  dueDate: Date;
  projectId: string;
  status: StatusEnum;
}
export default Milestone;
