import React, { useState } from "react";
import { LectureCommentContext } from "./LectureCommentContext"; 

interface LectureCommentProviderProps {
  children: React.ReactNode;
}

export const LectureCommentProvider: React.FC<LectureCommentProviderProps> = ({ children }) => {
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

  return (
    <LectureCommentContext.Provider value={{ selectedCommentId, setSelectedCommentId }}>
      {children}
    </LectureCommentContext.Provider>
  );
};
