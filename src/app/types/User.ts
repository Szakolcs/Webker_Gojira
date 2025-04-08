import SkillLevel from "./SkillLevelEnum";

interface User  {
  id: string,
  name: string,
  email: string,
  skillLevel: SkillLevel;
  teamIds: string[];
}

export default User;
