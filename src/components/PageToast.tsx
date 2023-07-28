import React, { useEffect, useState } from "react";

type OwnProps = {
  toastMsg: string; // 토스트메세지
  isAccept: boolean; // ui변경(green/red)
  onClose: () => void;
};

const PageToast: React.FC<OwnProps> = ({ toastMsg, isAccept, onClose }) => {
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
        className={`border-2 transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0 pointer-events-none"
        } ${isAccept ? "border-green text-green" : "border-red text-red"}`}
      >
        {toastMsg}
      </span>
    </div>
  );
};

export default PageToast;