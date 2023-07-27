type OwnProps = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: any; // any 괜찮은지 체크 필요
};

const Modal: React.FC<OwnProps> = ({ title, isOpen, onClose, children }) => {
  return (
    <div
      className={`fixed w-screen h-screen z-50 left-0 top-0 flex justify-center items-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="w-full h-full bg-black absolute opacity-30"
        onClick={onClose}
      />
      <div className="modal relative z-1 bg-white p-[33px] rounded-[10px] max-w-[775px] w-11/12">
        <div className="flex justify-between items-center mb-[20px]">
          <h2 className="text-[20px] font-[700] text-grayscale-100">{title}</h2>
          <button type="button" onClick={onClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_714_11426)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.07095 18.8224C3.84417 19.128 3.86937 19.5618 4.14655 19.8389C4.45144 20.1438 4.94578 20.1438 5.25068 19.8389L11.9727 13.1169L18.6947 19.839C18.9996 20.1439 19.4939 20.1439 19.7988 19.839C20.076 19.5618 20.1012 19.128 19.8744 18.8224L19.7988 18.7348L13.0644 12L19.7988 5.26523C20.076 4.98805 20.1012 4.55431 19.8744 4.24866L19.7988 4.1611C19.5216 3.88392 19.0879 3.85872 18.7822 4.0855L18.6947 4.1611L11.9727 10.8831L5.25068 4.16107L5.16311 4.08548C4.85747 3.85869 4.42373 3.88389 4.14655 4.16107L4.07095 4.24863C3.84417 4.55428 3.86937 4.98802 4.14655 5.2652L10.881 12L4.14655 18.7348L4.07095 18.8224Z"
                  fill="#808080"
                />
              </g>
              <defs>
                <clipPath id="clip0_714_11426">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>

        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
