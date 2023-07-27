import { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "@/redux/slice/classroomModalSlice";
import Image from "next/image";

interface ModalProps {
  children: ReactNode;
}

const Layout: React.FC<ModalProps> = ({ children }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex flex-col justify-center items-center"
      onClick={() => dispatch(closeModal())}
    >
      <article
        className="relative w-[770px] shadow-2xl bg-white pt-10 px-8 pb-9 flex flex-col gap-5 box-border rounded-[10px]"
        onClick={e => e.stopPropagation()}
      >
        {children}
        <button type="button">
          <Image
            src="/images/close.svg"
            alt="닫기 버튼"
            width={24}
            height={24}
            className="absolute top-10 right-8"
            onClick={() => dispatch(closeModal())}
          />
        </button>
      </article>
    </div>
  );
};

export default Layout;
