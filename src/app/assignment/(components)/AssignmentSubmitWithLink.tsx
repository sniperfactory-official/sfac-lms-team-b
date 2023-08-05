import PageToast from "@/components/PageToast";
import { useState } from "react";

type OwnProps = {
  onClose: () => void;
};

const AssignmentSubmitWithLink: React.FC<OwnProps> = ({ onClose }) => {
  const [inputValues, setInputValues] = useState<string[]>([""]);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [isAccept, setIsAccept] = useState<boolean>(false);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setInputValues(prevValues => {
      const newValues = [...prevValues];
      newValues[index] = event.target.value;
      return newValues;
    });
  };

  const isValidUrl = (url: string): boolean => {
    // 정규식을 사용한 URL 유효성 체크
    const urlPattern =
      /^(https?:\/\/)?([^\s.]+\.\S{2,}|localhost)(\/[^\s]*)?$/i;
    return urlPattern.test(url);
  };

  const handleAddInput = () => {
    // input 요소 추가
    setInputValues(prevValues => [...prevValues, ""]);
  };

  const handleDeleteInput = (index: number) => {
    if (inputValues.length === 1) {
      // 인풋이 1개일 때는 삭제 안 되게 처리
      return;
    }
    setInputValues(prevValues => prevValues.filter((value, i) => i !== index));
  };

  const handleSubmit = () => {
    for (let value of inputValues) {
      if (isValidUrl(value) || value === "") {
        // console.log(value);
      } else {
        setToastMsg("유효한 URL이 아닙니다. 다시 시도해주세요.");
        setIsAccept(false);
        return;
      }
    }
    // FIXME: hook 완성되면 firebase로 처리/빈 문자열 제거해서 전송
    let filterValue: string[] = inputValues.filter(url => url !== "");
    if (filterValue.length > 0) {
      // 여기서 firebase 처리
      console.log("filterValue", filterValue);
    } else {
      setToastMsg("1개 이상의 URL을 입력해주세요.");
      setIsAccept(false);
    }
  };

  const closeToast = () => {
    setToastMsg("");
  };

  return (
    <>
      <div>
        {inputValues.map((value, index) => {
          return (
            <div className="relative mb-[10px]" key={index}>
              <input
                value={value}
                onChange={event => {
                  handleInputChange(event, index);
                }}
                className="border border-grayscale-20 text-grayscale-20 w-full rounded-[10px] h-[42px] pl-[15px] pr-[50px]"
                type="text"
                placeholder="https://"
              />
              <button
                className="absolute top-1/2 right-[22px] transform -translate-y-1/2 text-[12px] text-grayscale-100 font-[400]"
                type="button"
                onClick={() => {
                  handleDeleteInput(index);
                }}
              >
                삭제
              </button>
            </div>
          );
        })}
      </div>
      <div>
        <button
          className="border border-grayscale-20 w-full rounded-[10px] h-[42px] px-[15px] flex justify-start items-center gap-[5px] text-grayscale-20"
          type="button"
          onClick={() => {
            handleAddInput();
          }}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 23.4375C6.46875 23.4375 1.5625 18.5312 1.5625 12.5C1.5625 6.46875 6.46875 1.5625 12.5 1.5625C18.5312 1.5625 23.4375 6.46875 23.4375 12.5C23.4375 18.5312 18.5312 23.4375 12.5 23.4375ZM12.5 3.125C7.32812 3.125 3.125 7.32812 3.125 12.5C3.125 17.6719 7.32812 21.875 12.5 21.875C17.6719 21.875 21.875 17.6719 21.875 12.5C21.875 7.32812 17.6719 3.125 12.5 3.125Z"
              fill="#E6E6E6"
            />
            <path
              d="M12.5 17.9688C12.0625 17.9688 11.7188 17.625 11.7188 17.1875V7.8125C11.7188 7.375 12.0625 7.03125 12.5 7.03125C12.9375 7.03125 13.2812 7.375 13.2812 7.8125V17.1875C13.2812 17.625 12.9375 17.9688 12.5 17.9688Z"
              fill="#E6E6E6"
            />
            <path
              d="M17.1875 13.2812H7.8125C7.375 13.2812 7.03125 12.9375 7.03125 12.5C7.03125 12.0625 7.375 11.7188 7.8125 11.7188H17.1875C17.625 11.7188 17.9688 12.0625 17.9688 12.5C17.9688 12.9375 17.625 13.2812 17.1875 13.2812Z"
              fill="#E6E6E6"
            />
          </svg>
          <span>링크 추가하기</span>
        </button>
      </div>
      <div className="flex justify-between items-center mt-[20px]">
        <div>
          {toastMsg && (
            <PageToast
              toastMsg={toastMsg}
              isAccept={isAccept}
              onClose={closeToast}
            />
          )}
        </div>
        <div className="flex justify-end items-center gap-[12px]">
          <button className="border" type="button" onClick={onClose}>
            취소
          </button>
          <button
            className="border"
            type="button"
            onClick={() => {
              handleSubmit();
            }}
          >
            업로드
          </button>
        </div>
      </div>
    </>
  );
};

export default AssignmentSubmitWithLink;
