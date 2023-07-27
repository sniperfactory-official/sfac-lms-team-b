type OwnProps = {
  onClose: () => void;
};

const SubmitAssignmentWithLink: React.FC<OwnProps> = ({ onClose }) => {
  return (
    <>
      <div>
        <input
          className="border border-grayscale-20 text-grayscale-20 w-full rounded-[10px] h-[42px] px-[15px]"
          type="text"
          placeholder="https://"
        />
      </div>
      <div className="mt-[10px]">
        <button
          className="border border-grayscale-20 w-full rounded-[10px] h-[42px] px-[15px] flex justify-start items-center gap-[5px] text-grayscale-20"
          type="button"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 23.4375C6.46875 23.4375 1.5625 18.5312 1.5625 12.5C1.5625 6.46875 6.46875 1.5625 12.5 1.5625C18.5312 1.5625 23.4375 6.46875 23.4375 12.5C23.4375 18.5312 18.5312 23.4375 12.5 23.4375ZM12.5 3.125C7.32812 3.125 3.125 7.32812 3.125 12.5C3.125 17.6719 7.32812 21.875 12.5 21.875C17.6719 21.875 21.875 17.6719 21.875 12.5C21.875 7.32812 17.6719 3.125 12.5 3.125Z"
              fill="#E6E6E6"
            />
            <path
              d="M12.5 17.9688C12.0625 17.9688 11.7188 17.625 11.7188 17.1875V7.8125C11.7188 7.375 12.0625 7.03125 12.5 7.03125C12.9375 7.03125 13.2812 7.375 13.2812 7.8125V17.1875C13.2812 17.625 12.9375 17.9688 12.5 17.9688Z"
              fill="#E6E6E6"
            />
            <path
              d="M17.1875 13.2812H7.8125C7.375 13.2812 7.03125 12.9375 7.03125 12.5C7.03125 12.0625 7.375 11.7188 7.8125 11.7188H17.1875C17.625 11.7188 17.9688 12.0625 17.9688 12.5C17.9688 12.9375 17.625 13.2812 17.1875 13.2812Z"
              fill="#E6E6E6"
            />
          </svg>
          <span>링크 추가하기</span>
        </button>
      </div>
      <div className="flex justify-end items-center gap-[12px] mt-[20px]">
        <button className="border" type="button" onClick={onClose}>
          취소
        </button>
        <button className="border" type="button">
          업로드
        </button>
      </div>
    </>
  );
};

export default SubmitAssignmentWithLink;
