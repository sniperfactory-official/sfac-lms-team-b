import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";

const LectureSetting: React.FC = ({}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(prev => !prev);
  };
  return (
    <div className="flex relative pt-[20px] pb-[29px]  gap-[69px]">
      <div className="flex gap-[12px] items-center ">
        <span className="text-black font-inter text-base font-semibold tracking-tighter leading-normal">
          수강 기간
        </span>
        <DatePicker
          locale={ko}
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          className="bg-white border-2 border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2 cursor-pointer"
          dateFormat="yyyy.MM.dd"
        />
      </div>
      <div className="flex gap-[12px] items-center">
        <span className="text-black font-inter text-base font-semibold tracking-tighter leading-normal">
          강의 공개
        </span>
        <label
          style={{
            display: "block",
            width: "51px",
            height: "26px",
            position: "relative",
          }}
        >
          <input type="checkbox" className="hidden" />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              borderRadius: "26px",
              backgroundColor: isChecked ? "#e5eeff" : "#f2f2f2",
              transition: "all 0.4s ease-in-out",
            }}
            onClick={handleToggle}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: isChecked ? "calc(100% - 21px)" : "5px",
              width: "16px",
              height: "16px",
              borderRadius: "13px",
              backgroundColor: isChecked ? "#337aff" : "#c5c5c5",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.3)",
              transition: "all 0.4s ease-in-out",
              transform: "translateY(-50%)",
            }}
            onClick={handleToggle}
          />
        </label>
      </div>
    </div>
  );
};
export default LectureSetting;
