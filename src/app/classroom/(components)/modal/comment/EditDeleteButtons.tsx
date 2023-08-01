import React from "react";

interface EditDeleteButtonsProps {
  showFullComment: boolean;
  userId: string;
  userUid: string | undefined;
  handleDeleteClick: (e: React.MouseEvent) => void;
  setIsEditMode: (isEditMode: boolean) => void;
}
const EditDeleteButtons: React.FC<EditDeleteButtonsProps> = ({
  showFullComment,
  userId,
  userUid,
  handleDeleteClick,
  setIsEditMode,
}) => {
  return showFullComment && userId === userUid ? (
    <ul className="flex text-xs space-x-1.5 text-gray-400 float-right pt-2">
      <li
        className="text-black hover:text-blue-500 cursor-pointer"
        onClick={() => setIsEditMode(true)}
      >
        수정
      </li>
      <li>|</li>
      <li
        className="text-black hover:text-red cursor-pointer"
        onClick={handleDeleteClick}
      >
        삭제
      </li>
    </ul>
  ) : null;
};
export default EditDeleteButtons;
