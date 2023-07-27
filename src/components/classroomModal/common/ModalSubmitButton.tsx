interface ModalSubmitButtonProps {
  handleModalMove: () => void;
  contents: string;
}

const ModalSubmitButton: React.FC<ModalSubmitButtonProps> = ({
  handleModalMove,
  contents,
}) => {
  return (
    <div className="flex mb-[-20px]">
      <button
        type="button"
        className="w-[107px] h-[45px] font-bold text-base bg-primary-80 text-white rounded-[10px] ml-auto"
        onClick={handleModalMove}
      >
        {contents}
      </button>
    </div>
  );
};

export default ModalSubmitButton;
