import { useEffect } from "react";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Layout from "../common/Layout";
import ModalHeader from "../common/ModalHeader";
import ModalMain from "../common/ModalMain";
import DropzoneSection from "./DropzoneSection";
import PageToast from "@/components/PageToast";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import useVideoFileDrop from "@/hooks/lecture/useVideoFileDrop";
import useFirebaseLectureSlice from "@/hooks/lecture/useFirebaseLectureSlice";
import {
  setErrorMessage,
  setSuccessMessage,
} from "@/redux/slice/dropzoneFileSlice";

const VideoFileModal: React.FC = () => {
  const dispatch = useDispatch();
  useFirebaseLectureSlice();

  const videoFileName = useSelector(
    (state: RootState) => state.dropzoneFile.videoFileName,
  );
  const errorMessage = useSelector(
    (state: RootState) => state.dropzoneFile.errorMessage,
  );
  const successMessage = useSelector(
    (state: RootState) => state.dropzoneFile.successMessage,
  );
  const { handleRemoveVideoFile } = useVideoFileDrop();

  useEffect(() => {
    if (videoFileName) {
      dispatch(
        setErrorMessage(
          "이미 사용 중인 파일이 있습니다. 기존의 파일을 삭제하고 진행해주세요.",
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout>
      <ModalHeader currentModalName="videoFileModalOpen" />
      <ModalMain>
        <div className="flex flex-col gap-5 h-72">
          {videoFileName && (
            <div className="flex gap-3 items-center">
              <Image
                src={"/images/fileIcon.svg"}
                alt={"파일 아이콘"}
                width={0}
                height={0}
                className="w-9 h-auto"
              />
              <span className="font-bold text-base text-primary-80">
                {videoFileName}
              </span>
              <button
                type="button"
                className="ml-auto text-xs text-grayscale-100 hover:font-bold"
                onClick={handleRemoveVideoFile}
              >
                삭제
              </button>
            </div>
          )}
          <DropzoneSection />
        </div>
      </ModalMain>

      {errorMessage && (
        <div className="absolute bottom-[25px] left-[25px]">
          <PageToast
            toastMsg={errorMessage}
            isAccept={false}
            onClose={() => dispatch(setErrorMessage(""))}
          />
        </div>
      )}
      {successMessage && (
        <div className="absolute bottom-[25px] left-[25px]">
          <PageToast
            toastMsg={successMessage}
            isAccept={true}
            onClose={() => dispatch(setSuccessMessage(""))}
          />
        </div>
      )}
    </Layout>
  );
};

export default VideoFileModal;
