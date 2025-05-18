import SkillLevel from "./SkillLevelEnum";

interface User  {
  id: string,
  name: string,
  password?: string,
  email: string,
  skillLevel: SkillLevel;
  teamIds: string[];
}

export default User;
