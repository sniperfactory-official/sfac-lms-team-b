import { Button } from "sfac-designkit-react";
import LectureSetting from "./LectureSetting";
interface ModalFooterProps {
  isButtonDisabled: boolean;
}
const ModalFooter: React.FC<ModalFooterProps> = ({ isButtonDisabled }) => {
  return (
    <div className="flex justify-between mb-[-20px]">
      <LectureSetting />
      <Button
        type="submit"
        variant="primary"
        text="업로드"
        asChild
        disabled={isButtonDisabled}
      />
    </div>
  );
};

export default ModalFooter;
