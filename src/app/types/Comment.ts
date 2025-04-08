interface Comment  {
  id: string;
  issueId: string;
  userId: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}
export default Comment;
