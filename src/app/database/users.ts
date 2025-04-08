import SkillLevelEnum from './../types/SkillLevelEnum';
import User from './../types/User';

const users: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', skillLevel: SkillLevelEnum.Beginner, teamIds: ['1'] },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', skillLevel: SkillLevelEnum.Intermediate, teamIds: ['1'] },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', skillLevel: SkillLevelEnum.Advanced, teamIds: ['2'] },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', skillLevel: SkillLevelEnum.Intermediate, teamIds: ['2'] },
  { id: '5', name: 'Eve Adams', email: 'eve@example.com', skillLevel: SkillLevelEnum.Beginner, teamIds: ['3'] },
  { id: '6', name: 'Frank Wright', email: 'frank@example.com', skillLevel: SkillLevelEnum.Advanced, teamIds: ['3'] },
  { id: '7', name: 'Gina Davis', email: 'gina@example.com', skillLevel: SkillLevelEnum.Beginner, teamIds: ['1', '3'] },
  { id: '8', name: 'Harry Potter', email: 'harry@example.com', skillLevel: SkillLevelEnum.Intermediate, teamIds: ['3'] },
  { id: '9', name: 'Ivy Clark', email: 'ivy@example.com', skillLevel: SkillLevelEnum.Advanced, teamIds: ['2'] },
  { id: '10', name: 'Jack Frost', email: 'jack@example.com', skillLevel: SkillLevelEnum.Beginner, teamIds: ['2'] },
];

export default users;
