import React, { FC, useState, ChangeEvent, FormEvent } from "react";

const CommentForm: FC = () => {
  const [comment, setComment] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handleComment(comment);
    setComment("");
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <div className="flex w-full h-25 flex-col space-x-4 items-start rounded-lg border text-gray-500 ">
      <div className="flex ml-4 mt-2">
        <div className="w-7 h-7 bg-white border border-gray-300 rounded-full"></div>
        <div className="ml-2 text-gray-500 mb-1 pt-[3px]">Username</div>
      </div>
      <div className="flex w-full mb-2">
        <form onSubmit={handleSubmit} className="w-full flex pr-8">
          <textarea
            className="w-11/12 h-10 p-2 resize-none border-none rounded text-black outline-none"
            value={comment}
            onChange={handleInputChange}
            placeholder="댓글을 입력해주세요."
          />
          <div className="flex m-auto ml-2 justify-end w-40 pt-1">
            <button
              type="submit"
              disabled={!comment}
              className={`w-4/5 h-7 text-sm rounded-md float-right ${
                comment ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              업로드
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CommentForm;
