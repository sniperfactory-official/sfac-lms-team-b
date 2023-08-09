import React from "react";
import SectionButton from "./SectionButton";
import SectionHandlerButton from "./SectionHandlerButton";
import useEditMode from "@/hooks/classroom/useEditMode";
const EditButton = () => {
  const { isEditMode, handleEditStatus } = useEditMode();

  return (
    // isEditMode ? '적용', '선택 삭제' : '섹션 수정'
    <React.Fragment>
      {isEditMode ? (
        <div className="w-[245px] h-[46px] mt-3 text-base flex justify-around items-center">
          <SectionButton type="set" />
          <SectionButton type="remove" />
        </div>
      ) : (
        <SectionHandlerButton
          text="섹션 수정"
          src="/images/edit.svg"
          onClick={handleEditStatus}
        />
      )}
    </React.Fragment>
  );
};

export default EditButton;
