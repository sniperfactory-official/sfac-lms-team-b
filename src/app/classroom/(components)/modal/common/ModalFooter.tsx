import LectureSetting from "./LectureSetting";
import ModalSubmitButton from "./ModalSubmitButton";

const ModalFooter: React.FC = () => {
  return (
    <div className="flex justify-between mb-[-20px]">
      <LectureSetting />
      <ModalSubmitButton />
    </div>
  );
};

export default ModalFooter;
