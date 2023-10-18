import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "@/redux/slice/classroomModalSlice";
import Image from "next/image";
import { resetInput } from "@/redux/slice/lectureInfoSlice";
import { resetDropzone } from "@/redux/slice/dropzoneFileSlice";
import useClassroomModal from "@/hooks/lecture/useClassroomModal";

interface ModalProps {
  children: ReactNode;
}

const Layout: React.FC<ModalProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { modalRole } = useClassroomModal();

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex flex-col justify-center items-center z-[9999]"
      onClick={() => {
        modalRole === "edit" && dispatch(resetDropzone());
        dispatch(closeModal());
      }}
    >
      <article
        className="relative w-[770px] bg-white px-[35px] py-[40px] flex flex-col gap-5 rounded-[10px] border border-solid border-grayscale-10 drop-shadow-[0_0_8px_rgba(0,0,0,0.25)] box-border"
        onClick={e => e.stopPropagation()}
      >
        {children}
        <button type="button">
          <Image
            src="/images/close.svg"
            alt="닫기 버튼"
            width={24}
            height={24}
            className="absolute top-[40px] right-[35px]"
            onClick={() => {
              dispatch(resetInput());
              dispatch(resetDropzone());
              dispatch(closeModal());
            }}
          />
        </button>
      </article>
    </div>
  );
};

export default Layout;
