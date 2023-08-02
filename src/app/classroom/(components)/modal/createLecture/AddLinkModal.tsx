import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import Layout from "../common/Layout";
import ModalHeader from "../common/ModalHeader";
import ModalMain from "../common/ModalMain";
import { setTextContent } from "@/redux/slice/lectureInfoSlice";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

const AddLinkModal: React.FC = () => {
  const textContent = useSelector(
    (state: RootState) => state.lectureInfo.textContent,
  );
  const dispatch = useDispatch();

  const { handleModalMove } = useClassroomModal();

  const prevModal = () => {
    handleModalMove("lectureTypeModalOpen", "linkModalOpen");
  };
  const handleInputContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value.startsWith("http://") && !value.startsWith("https://")) {
      dispatch(setTextContent("http://" + value));
    } else {
      dispatch(setTextContent(value));
    }
  };

  /*   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 */
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get(textContent);
      if (response.status === 200) {
        // 링크가 존재하고 접근 가능한 경우
        setErrorMessage(null);
        console.log("링크가 유효합니다:", textContent);
      } else {
        // 링크가 존재하지 않거나 접근할 수 없는 경우
        setErrorMessage("링크가 존재하지 않거나 접근할 수 없습니다.");
      }
    } catch (error) {
      // 에러 발생 시
      setErrorMessage("링크 접속 중 오류가 발생했습니다.");
    }
  };

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
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="textContent"
            id="textContent"
            placeholder="http://..."
            className="justify-center text-[16px] w-[707px] h-[42px] flex-shrink-0 border-[1px] border-grayscale-10 bg-grayscale-0 rounded-md pl-[14px]"
            value={textContent}
            onChange={handleInputContent}
          />
          {/* 에러 메시지 출력 */}
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </form>
      </ModalMain>
    </Layout>
  );
};

export default AddLinkModal;
