import Image from "next/image";

interface IButton {
  text: string;
  onClick?: () => void;
  src: string;
}

const SectionHandlerButton = ({ text, src, onClick }: IButton) => {
  return (
    <div className="w-[245px] h-[46px] mt-3 border border-primary-40 rounded-lg text-primary-60 text-base font-bold flex justify-center items-center">
      <Image src={src} alt="" width={20} height={20} />
      <button
        type="button"
        className="text-primary-60 text-base leading-[19px] ml-2"
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default SectionHandlerButton;
