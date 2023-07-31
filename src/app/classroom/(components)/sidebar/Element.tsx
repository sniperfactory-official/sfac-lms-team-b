import { useDispatch } from "react-redux";
import { toggleDeletionId } from "@/redux/slice/editCourseIdSlice";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { setLectureCount } from "@/redux/slice/editCourseIdSlice";

interface IProp {
  type: "course" | "lecture";
  title: string;
  clickFn?: () => void;
  isSelected: boolean;
  uniqueId: string; // 삭제시 필요한 데이터ID
  childCount?: number; // course 하위 lecture의 개수 몇 개인지 count, 하위 lecture를 모두 클릭하지 않을 시 course 삭제를 못하게 막는 방어변수
}

const Element = ({
  type,
  title,
  clickFn,
  isSelected,
  uniqueId,
  childCount,
}: IProp) => {
  const dispatch = useDispatch();
  const isEditMode = useSelector(
    (state: RootState) => state.editCourse.isEditMode,
  );

  useEffect(() => {
    // 선택된 course의 하위 lecture를 전역변수로 관리,
    if (type === "course" && isSelected) {
      dispatch(setLectureCount(childCount!));
    }
  }, [isSelected]);

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
      className={`flex justify-center items-center w-[245px] h-[46px] ${
        isSelected ? type_obj[type].bg : "bg-white"
      } rounded-lg ${type_obj[type].margin}`}
      onClick={clickFn}
    >
      {isEditMode && isSelected ? (
        <input
          className="w-[15px] h-[15px] border border-primary-30 "
          type="checkbox"
          onChange={() =>
            dispatch(toggleDeletionId({ type: type, id: uniqueId }))
          }
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
