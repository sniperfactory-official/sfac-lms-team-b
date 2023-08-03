import React, { useState } from "react";
import UserImage from "./UserImage";
import UserInfo from "./UserInfo";

interface EditCommentProps {
  content: string;
  username: string;
  role: string;
  profileImage: string;
  onEdit: (newContent: string) => void;
  onCancel: () => void;
}
const EditComment: React.FC<EditCommentProps> = ({
  content,
  username,
  role,
  profileImage,
  onEdit,
  onCancel,
}) => {
  const [textareaValue, setTextareaValue] = useState(content);

  return (
    <div className="flex items-start space-x-4 w-full">
      <UserImage profileImage={profileImage} size="large" />
      <div className="flex flex-col w-full">
        <UserInfo username={username} role={role} />
        <div className="w-full flex justify-between items-start">
          <form className="w-full flex flex-col">
            <textarea
              value={textareaValue}
              onChange={e => setTextareaValue(e.target.value)}
              className="w-full h-8 text-sm resize-none border-none rounded text-black outline-none"
            />
            <div className="flex justify-end space-x-4 mt-2">
              <button
                className="w-28 h-8 text-sm rounded-lg bg-gray-100 text-gray-500"
                onClick={onCancel}
              >
                취소하기
              </button>
              <button
                className="w-28 h-8 text-sm rounded-lg bg-blue-500 text-white hover:bg-white hover:border hover:border-blue-600 hover:text-blue-600"
                onClick={() => onEdit(textareaValue)}
              >
                수정하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditComment;
