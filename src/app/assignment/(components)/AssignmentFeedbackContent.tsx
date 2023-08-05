import { useState } from "react";
import AssignmentProfileImage from "./AssignmentProfileImage";
import AssignmentLocalConfirmDialog from "./AssignmentLocalConfirmDialog";

const AssignmentFeedbackContent = ({
  id,
  content,
  createdAt,
  updatedAt,
  user: { username, role },
  userId,
  submittedAssignmentId,
  loginUserId,
}: any) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  return (
    <>
      <li className="rounded-[10px] border border-grayscale-10 bg-grayscale-0 p-[24px_24px_16px_24px]">
        <div className="flex justify-start items-start gap-[13px]">
          <div className="pt-[3px]">
            <AssignmentProfileImage profileImage={"profileImage"} />
          </div>
          <div className="grow">
            <div className="flex justify-between items-center mb-[9px]">
              <div>
                <span className="font-[700] text-grayscale-100">
                  {username}
                </span>
                <span className="text-grayscale-20 font-[400]">
                  {" "}
                  &middot; {role}
                </span>
              </div>
              {userId.id === loginUserId ? (
                <div>
                  <button
                    type="button"
                    className="text-grayscale-100 text-[12px] font-[400] after:content-['|'] after:text-grayscale-30 after:ml-[5px] after:mr-[5px]"
                  >
                    수정
                  </button>
                  <button
                    type="button"
                    className="text-grayscale-100 text-[12px] font-[400]"
                    onClick={() => {
                      setIsConfirmOpen(true);
                    }}
                  >
                    삭제
                  </button>
                </div>
              ) : null}
            </div>
            <div>
              <textarea
                className="w-full text-[14px] text-black font-[400] bg-white"
                name=""
                id=""
                rows={3}
                disabled={true}
                style={{ resize: "none" }}
                defaultValue={content}
              />
            </div>
          </div>
        </div>
        <p className="text-[12px] text-end text-grayscale-40">
          {createdAt === updatedAt ? createdAt : updatedAt}
        </p>
      </li>
      {isConfirmOpen ? (
        <AssignmentLocalConfirmDialog
          title="삭제하시겠습니까?"
          content="한번 삭제하시면 다시 복구가 불가능합니다."
          confirmBtnMsg="확인"
          onConfirm={() => setIsConfirmOpen(false)}
          isOpen={isConfirmOpen}
          onCancel={() => setIsConfirmOpen(false)}
          feedbackId={id}
          submittedAssignmentId={submittedAssignmentId}
        />
      ) : null}
    </>
  );
};

export default AssignmentFeedbackContent;
