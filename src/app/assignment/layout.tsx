import React, { ReactNode } from "react";
import AssignmentLeftNav from "./(components)/AssignmentLeftNav";

interface Props {
  children: ReactNode;
}

const layout = ({ children }: Props) => {
  return (
    <div className="w-screen flex justify-center">
      <div className="w-4/5 flex mb-[20px]">
        <div className="w-1/5 h-100 flex items-center flex-col mr-[20px]">
          <AssignmentLeftNav />
        </div>
        <div className="w-4/5 h-100 ml-[50px]">{children}</div>
      </div>
    </div>
  );
};

export default layout;
