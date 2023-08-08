import { useState } from "react";
import { useDeleteFeedback } from "@/hooks/mutation/useDeleteFeedback";
import { useUpdateFeedback } from "@/hooks/mutation/useUpdateFeedback";
import { useForm } from "react-hook-form";
import PageToast from "@/components/PageToast";
import AssignmentProfileImage from "./AssignmentProfileImage";
import AssignmentLocalConfirmDialog from "./AssignmentLocalConfirmDialog";

interface IUpdateFeedbackForm {
  updateFeedback: string;
}

const AssignmentFeedbackContent = ({
  id,
  content,
  createdAt,
  updatedAt,
  user: { username, role },
  userId,
  submittedAssignmentId,
  loginUserId,
  updateDelete,
  setUpdateDelete,
}: any) => {
  const [updateMode, setUpdateMode] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAccept] = useState(true);
  const [toastMsg, setToastMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<IUpdateFeedbackForm>({ mode: "onChange" });

  const {
    mutate: updateMutate,
    isLoading: updateLoding,
    error: updateError,
  } = useUpdateFeedback(submittedAssignmentId, id);

  const {
    mutate: deleteMutate,
    isLoading: deleteLoading,
    error: deleteError,
  } = useDeleteFeedback(submittedAssignmentId, id);

  const onValid = (textValue: IUpdateFeedbackForm) => {
    updateMutate({
      content: textValue.updateFeedback,
      updatedAt: new Date(),
    });
    setUpdateMode((prev: any) => !prev);
    setUpdateDelete((prev: boolean) => !prev);
    setToastMsg("수정이 완료되었습니다.");
  };

  const onClose = () => {
    setToastMsg("");
  };

  const handleUpdateDelete = () => {
    setUpdateMode((prev: any) => !prev);
    setUpdateDelete((prev: boolean) => !prev);
  };

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
              {userId.id === loginUserId && !updateDelete ? (
                <div>
                  <button
                    type="button"
                    className="text-grayscale-100 text-[12px] font-[400] after:content-['|'] after:text-grayscale-30 after:ml-[5px] after:mr-[5px]"
                    onClick={handleUpdateDelete}
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
            <form onSubmit={handleSubmit(onValid)}>
              <div>
                <textarea
                  className="w-full text-[14px] text-black font-[400] bg-white"
                  {...register("updateFeedback", {
                    required: true,
                  })}
                  name="updateFeedback"
                  id=""
                  rows={3}
                  disabled={!updateMode}
                  style={{ resize: "none" }}
                  defaultValue={content}
                />
              </div>
              {updateMode ? (
                <div className="flex justify-end item-center gap-[8px]">
                  <button
                    className="w-[115px] h-[35px]  rounded-md bg-grayscale-5 text-grayscale-60"
                    type="button"
                    onClick={handleUpdateDelete}
                  >
                    취소하기
                  </button>
                  <button
                    className="w-[115px] h-[35px] rounded-md bg-primary-80 text-white disabled:bg-grayscale-10 disabled:text-grayscale-20"
                    type="submit"
                    disabled={!isValid}
                  >
                    수정하기
                  </button>
                </div>
              ) : (
                <p className="text-[12px] text-end text-grayscale-40 h-[35px]">
                  {createdAt === updatedAt ? createdAt : updatedAt}
                </p>
              )}
            </form>
          </div>
        </div>
      </li>
      <AssignmentLocalConfirmDialog
        title="삭제하시겠습니까?"
        content="한번 삭제하시면 다시 복구가 불가능합니다."
        confirmBtnMsg="확인"
        onConfirm={() => {
          deleteMutate();
          setToastMsg("삭제가 완료되었습니다.");
          setIsConfirmOpen(false);
        }}
        isOpen={isConfirmOpen}
        onCancel={() => setIsConfirmOpen(false)}
      />
      {toastMsg ? (
        <div className="absolute left-12 bottom-16">
          <PageToast
            toastMsg={toastMsg}
            isAccept={isAccept}
            onClose={onClose}
          />
        </div>
      ) : null}
    </>
  );
};

export default AssignmentFeedbackContent;
