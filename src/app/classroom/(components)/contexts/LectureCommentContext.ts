import { createContext, useContext } from "react";

export interface LectureCommentContextProps {
  selectedCommentId: string | null;
  setSelectedCommentId: (id: string | null) => void;
}

export const LectureCommentContext = createContext<
  LectureCommentContextProps | undefined
>(undefined);

export const useLectureCommentContext = () => {
  const context = useContext(LectureCommentContext);
  if (!context) {
    throw new Error(
      "useLectureCommentContext must be used within a LectureCommentProvider",
    );
  }
  return context;
};
