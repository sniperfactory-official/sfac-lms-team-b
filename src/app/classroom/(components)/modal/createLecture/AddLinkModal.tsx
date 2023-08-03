import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Layout from "../common/Layout";
import ModalHeader from "../common/ModalHeader";
import ModalMain from "../common/ModalMain";
import { setExternalLink } from "@/redux/slice/lectureInfoSlice";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { db } from "@/utils/firebase";
import useLinkValidity from "@/hooks/lecture/useLinkValidity";
import useLectureInfo from "@/hooks/lecture/useLectureInfo";

const AddLinkModal: React.FC = () => {
  const { externalLink } = useLectureInfo();
  const dispatch = useDispatch();

  const { handleModalMove } = useClassroomModal();

  const prevModal = () => {
    handleModalMove("lectureTypeModalOpen", "linkModalOpen");
  };

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(
      setExternalLink(value.startsWith("http://") ? value : "http://" + value),
    );
    isValidLink();
  };

  const { checkLinkValidity } = useLinkValidity(db);

  const isValidLink = async () => {
    const linkRegex = /^(https?:\/\/)?([a-z0-9\-]+\.)+[a-z]{2,}(\/.*)*$/i;
    if (!linkRegex.test(externalLink)) {
      setErrorMessage("올바른 URL 형식이 아닙니다.");
      return;
    }
    try {
      await checkLinkValidity(externalLink);
      setErrorMessage(""); // 유효성 검사 에러 메시지 초기화
    } catch (error) {
      setErrorMessage("링크 유효성 검사 실패"); // 유효성 검사 실패 에러 메시지 설정
    }
  };

  useEffect(() => {
    // 키보드 입력이 종료될 때마다 유효성 검사 실행
    const handleKeyUp = () => {
      isValidLink();
    };
    return () => {
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

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
            value={externalLink}
            onChange={handleInputContent}
          />
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </form>
      </ModalMain>
    </Layout>
  );
};

export default AddLinkModal;
