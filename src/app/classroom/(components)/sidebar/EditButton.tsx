import React from "react";
import SectionButton from "./SectionButton";
import SectionHandlerButton from "./SectionHandlerButton";

interface IProp {
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditButton = ({ isEditMode, setIsEditMode }: IProp) => {
  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    // isEditMode ? '적용', '선택 삭제' : '섹션 수정'
    <React.Fragment>
      {isEditMode ? (
        <div className="w-[245px] h-[46px] mt-3 text-base flex justify-around items-center">
          <SectionButton type="set" onClick={handleEditMode} />
          <SectionButton type="remove" onClick={handleEditMode} />
        </div>
      ) : (
        <SectionHandlerButton
          text="섹션 수정"
          src="/images/edit.svg"
          onClick={handleEditMode}
        />
      )}
    </React.Fragment>
  );
};

export default EditButton;
