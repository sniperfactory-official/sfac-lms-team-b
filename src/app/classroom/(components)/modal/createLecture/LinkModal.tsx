import { useDispatch } from "react-redux";
import Layout from "../common/Layout";
import ModalHeader from "../common/ModalHeader";
import ModalMain from "../common/ModalMain";
import useLectureInfo from "@/hooks/lecture/useLectureInfo";
import { setExternalLink } from "@/redux/slice/lectureInfoSlice";
import useFirebaseLectureSlice from "@/hooks/lecture/useFirebaseLectureSlice";

const LinkModal: React.FC = () => {
  const dispatch = useDispatch();
  const { externalLink } = useLectureInfo();
  const handleInputContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setExternalLink(e.target.value));
  };
  useFirebaseLectureSlice();

  return (
    <Layout>
      <ModalHeader currentModalName="linkModalOpen" />
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
      </ModalMain>
    </Layout>
  );
};

export default LinkModal;
