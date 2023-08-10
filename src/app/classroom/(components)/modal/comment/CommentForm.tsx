import React, { FC, useState, ChangeEvent, FormEvent, useEffect } from "react";
import useUser from "@/hooks/user/useUser";
import { useSubmitComment } from "@/hooks/lecture/useSubmitComment";
import UserImage from "./UserImage";
import UserInfo from "./UserInfo";
import { Button, Text } from "sfac-designkit-react";

interface CommentFormProps {
  parentId?: string;
  lectureId: string;
  isReply?: boolean;
  initialContent?: string;
  modalOpen?: boolean;
}

const CommentForm: FC<CommentFormProps> = ({
  parentId = "",
  lectureId,
  isReply,
  initialContent = "",
  modalOpen,
}) => {
  const [comment, setComment] = useState(initialContent);
  const { user, username, profileImage } = useUser();
  const handleSubmit = useSubmitComment();

  useEffect(() => {
    setComment(initialContent);
  }, [initialContent]);

  useEffect(() => {
    if (!modalOpen) {
      setComment("");
    }
  }, [modalOpen]);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      handleSubmit(
        {
          content: comment,
          lectureId: lectureId,
          parentId: parentId,
          userId: user.uid,
          isReply: isReply,
        },
        e,
      );
      setComment("");
    }
  };

  return (
    <div className="flex w-full h-25 flex-col space-x-4 items-start rounded-lg border text-gray-500 p-5">
      <div className="flex items-start space-x-4 w-full">
        <UserImage profileImage={profileImage} size="large" />
        <div className="flex flex-col w-full">
          {username && <UserInfo username={username} isForm={true} />}
          <div className="w-full flex justify-between items-start">
            <form onSubmit={handleFormSubmit} className="w-full flex flex-col">
              <textarea
                value={comment}
                onChange={handleInputChange}
                className="w-full h-8 text-sm resize-none border-none rounded text-black outline-none"
                placeholder="댓글을 입력해주세요."
              />
              <div className="flex justify-end space-x-4 mt-2">
                <Button
                  variant="primary"
                  text="업로드"
                  type="submit"
                  disabled={!comment}
                  textSize="sm"
                  asChild
                  className={`p-1 w-28 h-8 text-sm rounded-lg ${
                    comment
                      ? "bg-blue-500 text-white hover:bg-white hover:border hover:border-blue-600 hover:text-blue-600"
                      : "bg-gray-100 text-gray-500"
                  }`}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
