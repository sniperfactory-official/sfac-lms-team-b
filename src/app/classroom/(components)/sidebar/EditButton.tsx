import React from "react";
import SectionButton from "./SectionButton";
import SectionHandlerButton from "./SectionHandlerButton";
import { useDispatch, useSelector } from "react-redux";
import { handleEditMode } from "@/redux/slice/editCourseIdSlice";
import { RootState } from "@/redux/store";

const EditButton = () => {
  const dispatch = useDispatch();
  const isEditMode = useSelector(
    (state: RootState) => state.editCourse.isEditMode,
  );

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
          onClick={() => dispatch(handleEditMode())}
        />
      )}
    </React.Fragment>
  );
};

export default EditButton;
