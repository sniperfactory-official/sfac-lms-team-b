import React, { ReactNode } from "react";
import LeftNav from "./components/LeftNav";

interface Props {
  children: ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div>
      <LeftNav />
      {children}
    </div>
  );
};

export default layout;
