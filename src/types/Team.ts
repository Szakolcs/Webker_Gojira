import User from "./User";

interface Team {
  id: string;
  name: string;
  users: User[];
  projectIds: string[];
}

export default Team;
