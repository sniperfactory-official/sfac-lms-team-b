import React, { RefObject, createContext, useContext } from "react";
import ReactPlayer from "react-player";

interface VideoRefContextType {
  videoRef: RefObject<ReactPlayer> | null;
  setVideoRef: (ref: React.RefObject<ReactPlayer>) => void;
}

export const VideoRefContext = createContext<VideoRefContextType>({
  videoRef: null,
  setVideoRef: () => {},
});
