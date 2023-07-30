interface IProp {
  type: "course" | "lecture";
  isEditMode: boolean;
  title: string;
  clickFn?: () => void;
}

const Element = ({ type, isEditMode, title, clickFn }: IProp) => {
  const type_obj = {
    course: {
      bg: "bg-primary-5",
      text: "text-[16px]",
      margin: "mt-[10px]",
    },
    lecture: {
      bg: "bg-white",
      text: "text-[14px]",
      margin: "mt-[0px]",
    },
  };

  return (
    <div
      className={`flex justify-center items-center w-[245px] h-[46px] ${type_obj[type].bg} rounded-lg ${type_obj[type].margin}`}
      onClick={clickFn}
    >
      {isEditMode ? (
        <input
          className="w-[15px] h-[15px] border border-primary-30 "
          type="checkbox"
        />
      ) : type === "course" ? (
        <div className="w-[15px] h-[15px] flex justify-center items-center">
          🎯
        </div>
      ) : (
        <div className="w-[15px] h-[15px] flex justify-center items-center"></div>
      )}
      <label className={`${type_obj[type].text} ml-[10px]`}>{title}</label>
    </div>
  );
};

export default Element;
