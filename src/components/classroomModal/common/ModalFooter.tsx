import ModalSubmitButton from "./ModalSubmitButton";

const ModalFooter: React.FC = () => {
  return (
    <div className="flex justify-between mb-[-20px]">
      {/* 이 위치에 수상 기간 및 강의 공개 컴포넌트  */}
      <ModalSubmitButton />
    </div>
  );
};

export default ModalFooter;
