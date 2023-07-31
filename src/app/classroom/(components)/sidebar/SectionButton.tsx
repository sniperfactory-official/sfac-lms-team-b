interface IProp {
  type: "set" | "remove";
  onClick: () => void;
}

const SectionButton = ({ type, onClick }: IProp) => {
  const type_obj = {
    set: {
      text: "적용",
      bg: "bg-primary-80",
    },
    remove: {
      text: "선택 삭제",
      bg: "bg-red",
    },
  };
  return (
    <button
      className={`w-[115px] h-[35px] text-white ${type_obj[type].bg} rounded-lg text-[14px]`}
      onClick={onClick}
    >
      {type_obj[type].text}
    </button>
  );
};

export default SectionButton;
