import React, { useEffect, useState } from "react";

type OwnProps = {
  toastMsg: string; // 토스트메세지
  onClose: () => void;
};

const GlobalToast: React.FC<OwnProps> = ({ toastMsg, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    const closeTimer = setTimeout(() => {
      onClose();
    }, 3300); // 하단 duration에 맞게 조정

    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  return (
    <div>
      {/* FIXME: 임시 element: 추후 디자인시스템 완료 시 element 및 style 교체 */}
      <span
        className={`z-50 fixed right-0 bottom-0 border-2 border-black transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {toastMsg}
      </span>
    </div>
  );
};

export default GlobalToast;
