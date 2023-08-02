import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import useAuth from "@/hooks/user/useAuth";
import useUsername from "@/hooks/user/useUserName";
import useUserProfileImage from "@/hooks/user/useUserProfileImage";
import { useDispatch } from "react-redux";
import { useAddComment } from "@/hooks/mutation/useAddComment";
import { setModalVisibility } from "@/redux/slice/classroomModalSlice";
import UserImage from "./UserImage";
import UserInfo from "./UserInfo";

interface CommentFormProps {
  parentId?: string;
  lectureId: string;
  isReply?: boolean;
}
const CommentForm: FC<CommentFormProps> = ({
  parentId = "",
  lectureId,
  isReply,
}) => {
  const [comment, setComment] = useState("");
  const user = useAuth();
  const username = useUsername(user?.uid ?? null);
  const profileImage = useUserProfileImage(user?.uid ?? null);
  const mutation = useAddComment();
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user && lectureId) {
      mutation.mutate({
        content: comment,
        lectureId: lectureId,
        parentId: parentId,
        userId: user.uid,
      });
      setComment("");
      if (!isReply) {
        dispatch(
          setModalVisibility({ modalName: "commentModalOpen", visible: false }),
        );
      }
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="flex w-full h-25 flex-col space-x-4 items-start rounded-lg border text-gray-500 p-5">
      <div className="flex items-start space-x-4 w-full">
        {profileImage && <UserImage profileImage={profileImage} size="large" />}
        <div className="flex flex-col w-full">
          {username && <UserInfo username={username} isForm={true} />}
          <div className="w-full flex justify-between items-start">
            <form onSubmit={handleSubmit} className="w-full flex flex-col">
              <textarea
                value={comment}
                onChange={handleInputChange}
                className="w-full h-8 text-sm resize-none border-none rounded text-black outline-none"
                placeholder="댓글을 입력해주세요."
              />
              <div className="flex justify-end space-x-4 mt-2">
                <button
                  type="submit"
                  disabled={!comment}
                  className={`w-28 h-8 text-sm rounded-lg ${
                    comment
                      ? "bg-blue-500 text-white hover:bg-white hover:border hover:border-blue-600 hover:text-blue-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  업로드
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
