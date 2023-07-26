import React from "react";

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-50
        bg-primary-80
        text-white
        p-4
        w-96
        font-semibold
      `}
    >
      {label}
    </button>
  );
};

export default Button;
