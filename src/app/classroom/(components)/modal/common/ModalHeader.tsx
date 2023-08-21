import useClassroomModal from "@/hooks/lecture/useClassroomModal";
import Image from "next/image";

enum ModalNames {
  linkModalOpen = "링크 만들기",
  noteModalOpen = "노트 만들기",
  videoFileModalOpen = "영상 강의 만들기",
}

const BreadcrumbItem: React.FC<{ label: string }> = ({ label }) => (
  <>
    <Image
      src={"/images/arrow-right.svg"}
      alt={"다음 페이지로 이동"}
      width={0}
      height={0}
      className="w-[7px] h-[11px]"
    />
    <span>{label}</span>
  </>
);

const ModalHeader: React.FC<{ currentModalName?: keyof typeof ModalNames }> = ({
  currentModalName,
}) => {
  const { modalRole, handleModalMove } = useClassroomModal();

  return (
    <div className="flex items-center gap-[10px] text-xl font-bold text-grayscale-100">
      {modalRole === "create" && !currentModalName && <span>강의 만들기</span>}
      {modalRole === "create" && currentModalName && (
        <>
          <button
            onClick={() =>
              handleModalMove("lectureTypeModalOpen", currentModalName)
            }
          >
            강의 만들기
          </button>
          <BreadcrumbItem label={ModalNames[currentModalName]} />
        </>
      )}
      {modalRole === "edit" && (
        <>
          <span>강의 수정</span>
          <BreadcrumbItem label="수정하기" />
        </>
      )}
    </div>
  );
};

export default ModalHeader;
