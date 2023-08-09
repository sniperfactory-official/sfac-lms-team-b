import { useDispatch } from "react-redux";
import { Timestamp } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/locale";
import {
  setStartDate,
  setEndDate,
  setIsLecturePrivate,
  clearError,
} from "@/redux/slice/lectureInfoSlice";
import useLectureInfo from "@/hooks/lecture/useLectureInfo";
import { DateSelector, Text } from "sfac-designkit-react";

const LectureSetting: React.FC = () => {
  const dispatch = useDispatch();
  const { startDate, endDate, isLecturePrivate } = useLectureInfo();

  const handleToggle = () => {
    dispatch(setIsLecturePrivate(!isLecturePrivate));
  };

  const handleChangeDate = (ranges: [Date | null, Date | null]) => {
    const [startDate, endDate] = ranges;

    dispatch(
      setStartDate(
        startDate ? new Timestamp(startDate.getTime() / 1000, 0) : null,
      ),
    );
    dispatch(
      setEndDate(endDate ? new Timestamp(endDate.getTime() / 1000, 0) : null),
    );
  };

  const timestampToDate = (timestamp: Timestamp | null): Date | null => {
    return timestamp ? timestamp.toDate() : null;
  };

  return (
    <div className="flex relative gap-[69px]">
      <div className="flex gap-[12px] items-center ">
        <Text size="base" weight="medium">
          수강 기간
        </Text>
        <DateSelector
          selected={startDate ? timestampToDate(startDate) : null}
          startDate={startDate ? timestampToDate(startDate) : null}
          endDate={endDate ? timestampToDate(endDate) : null}
          ChangeDate={handleChangeDate}
        />
      </div>
      <div className="flex gap-[12px] items-center">
        <Text size="base" weight="medium">
          강의 공개
        </Text>
        <label htmlFor="toggle" className="relative block w-[51px] h-[26px]">
          <input
            type="checkbox"
            id="toggle"
            name="toggle"
            className="hidden"
            checked={isLecturePrivate}
            onChange={handleToggle}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "26px",
              backgroundColor: isLecturePrivate ? "#f2f2f2" : "#e5eeff",
              transition: "all 0.4s ease-in-out",
            }}
          />
          <div
            className="absolute top-50%"
            style={{
              position: "absolute",
              top: "50%",
              left: isLecturePrivate ? "5px" : "calc(100% - 21px)",
              width: "16px",
              height: "16px",
              borderRadius: "13px",
              backgroundColor: isLecturePrivate ? "#c5c5c5" : "#337aff",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)",
              transition: "all 0.4s ease-in-out",
              transform: "translateY(-50%)",
            }}
          />
        </label>
      </div>
    </div>
  );
};
export default LectureSetting;
