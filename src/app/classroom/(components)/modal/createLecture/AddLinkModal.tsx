import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../common/Layout";
import ModalHeader from "../common/ModalHeader";
import ModalMain from "../common/ModalMain";
import { setExternalLink } from "@/redux/slice/lectureInfoSlice";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import useLectureInfo from "@/hooks/lecture/useLectureInfo";

const AddLinkModal: React.FC = () => {
  const dispatch = useDispatch();
  const { handleModalMove } = useClassroomModal();
  const { externalLink } = useLectureInfo();

  const prevModal = () => {
    handleModalMove("lectureTypeModalOpen", "linkModalOpen");
  };
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setExternalLink(e.target.value));
  };

  useEffect(() => {
    // 키보드 입력이 종료될 때마다 유효성 검사 실행
    const handleKeyUp = () => {
      const linkRegex = /^(https?:\/\/)?([a-z0-9\-]+\.)+[a-z]{2,}(\/.*)*$/i;
      if (!linkRegex.test(externalLink)) {
        setErrorMessage("올바른 URL 형식이 아닙니다.");
      } else {
        setErrorMessage("");
      }
    };
    const timer = setTimeout(handleKeyUp, 500); // 1초 후에 실행
    return () => {
      clearTimeout(timer); // 타이머 제거 (1초 내에 입력이 다시 시작되면 타이머 리셋)
    };
  }, [externalLink]);

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
        <label htmlFor="externalLink" className="hidden" />
        <input
          type="text"
          name="externalLink"
          id="externalLink"
          placeholder="https://..."
          className="justify-center text-[16px] w-[707px] h-[42px] flex-shrink-0 border-[1px] border-grayscale-10 bg-grayscale-0 rounded-md pl-[14px]"
          value={externalLink}
          onChange={handleInputContent}
        />
        {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
      </ModalMain>
    </Layout>
  );
};

export default AddLinkModal;
