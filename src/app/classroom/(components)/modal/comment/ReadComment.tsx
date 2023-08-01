import UserImage from "./UserImage";
import UserInfo from "./UserInfo";
import CommentText from "./CommentText";

interface ReadCommentProps {
  displayedComment: React.ReactNode[];
  username: string;
  role: string;
  profileImage: string;
}
const ReadComment: React.FC<ReadCommentProps> = ({
  displayedComment,
  username,
  role,
  profileImage,
}) => {
  return (
    <div className="flex items-start space-x-4 w-full">
      <UserImage profileImage={profileImage} size="large" />
      <div className="flex flex-col w-full">
        <UserInfo username={username} role={role} />
        <CommentText displayedComment={displayedComment} />
      </div>
    </div>
  );
};

export default ReadComment;
