import React from "react";
import SectionButton from "./SectionButton";
import SectionHandlerButton from "./SectionHandlerButton";

interface IProp {
  isEditMode: boolean;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const AsideButton = ({ isEditMode, setIsEditMode }: IProp) => {
  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
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

export default AsideButton;
