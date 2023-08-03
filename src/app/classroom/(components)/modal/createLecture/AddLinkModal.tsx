import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Layout from "../common/Layout";
import ModalHeader from "../common/ModalHeader";
import ModalMain from "../common/ModalMain";
import { setTextContent } from "@/redux/slice/lectureInfoSlice";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import { useEffect, useState } from "react";

const AddLinkModal: React.FC = () => {
  const textContent = useSelector(
    (state: RootState) => state.lectureInfo.textContent,
  );
  const dispatch = useDispatch();
  const { handleModalMove } = useClassroomModal();

  const prevModal = () => {
    handleModalMove("lectureTypeModalOpen", "linkModalOpen");
  };
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setTextContent(e.target.value));
  };

  useEffect(() => {
    // 키보드 입력이 종료될 때마다 유효성 검사 실행
    const handleKeyUp = () => {
      const linkRegex = /^(https?:\/\/)?([a-z0-9\-]+\.)+[a-z]{2,}(\/.*)*$/i;
      if (!linkRegex.test(textContent)) {
        setErrorMessage("올바른 URL 형식이 아닙니다.");
      } else {
        setErrorMessage("");
      }
    };
    const timer = setTimeout(handleKeyUp, 500); // 1초 후에 실행
    return () => {
      clearTimeout(timer); // 타이머 제거 (1초 내에 입력이 다시 시작되면 타이머 리셋)
    };
  }, [textContent]);

  return (
    <Layout>
      <ModalHeader currentModalName={"링크 만들기"}>
        <button
          onClick={prevModal}
          className="text-xl font-bold text-grayscale-100"
        >
          강의 만들기
        </button>
      </ModalHeader>
      <ModalMain>
        <form>
          <input
            type="text"
            name="textContent"
            id="textContent"
            placeholder="https://..."
            className="justify-center text-[16px] w-[707px] h-[42px] flex-shrink-0 border-[1px] border-grayscale-10 bg-grayscale-0 rounded-md pl-[14px]"
            value={textContent}
            onChange={handleInputContent}
          />
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </form>
      </ModalMain>
    </Layout>
  );
};

export default AddLinkModal;
