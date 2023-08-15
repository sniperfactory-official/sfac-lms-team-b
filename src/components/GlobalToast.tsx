import React, { useEffect, useState } from "react";
import { Toast } from "sfac-designkit-react";

type tGlobalToastProps = {
  toastMsg: string; // 토스트메세지
  onClose: () => void;
};

const GlobalToast = ({ toastMsg, onClose }: tGlobalToastProps) => {
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
    <div
      className={`w-10 h-10 bg-black z-50 fixed right-0 bottom-0 transition-all duration-300 ${
        visible ? "opacity-100 top-0" : "opacity-0 pointer-events-none top-2"
      }`}
    >
      <Toast type="Simple" text={toastMsg} />
    </div>
  );
};

export default GlobalToast;
