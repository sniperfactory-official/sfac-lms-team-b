import React, { ReactNode } from "react";
import AssignmentLeftNav from "./(components)/AssignmentLeftNav";

interface Props {
  children: ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div>
      <AssignmentLeftNav />
      {children}
    </div>
  );
};

export default layout;
