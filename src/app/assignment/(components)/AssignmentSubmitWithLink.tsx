import PageToast from "@/components/PageToast";
import { useState } from "react";
import Image from "next/image";
import { useSubmitAssignment } from "@/hooks/mutation/useSubmitAssignment";

type OwnProps = {
  onClose: () => void;
  assignmentId: string;
  userId: string;
};

const AssignmentSubmitWithLink: React.FC<OwnProps> = ({
  onClose,
  userId,
  assignmentId,
}) => {
  const [inputValues, setInputValues] = useState<string[]>([""]);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [isAccept, setIsAccept] = useState<boolean>(false);

  const { mutate, isLoading, error } = useSubmitAssignment(
    assignmentId,
    userId,
  );

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
      mutate(filterValue); // FIXME: ts error 수정 필요
      setToastMsg("링크가 업로드되었습니다!");
      setIsAccept(true);
      setTimeout(() => {
        onClose();
      }, 2000);
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
          <div className="w-[25px] h-[25px]">
            <Image
              src="/images/icon_plus_gray.svg"
              alt=""
              width="0"
              height="0"
              className="w-full h-full"
            />
          </div>
          <span>링크 추가하기</span>
        </button>
      </div>
      <div className="absolute left-0 bottom-0 w-full min-h-[97px] p-[20px_31px_42px]">
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
      <div className="absolute left-[33px] bottom-[33px]">
        {toastMsg && (
          <PageToast
            toastMsg={toastMsg}
            isAccept={isAccept}
            onClose={closeToast}
          />
        )}
      </div>
    </>
  );
};

export default AssignmentSubmitWithLink;
