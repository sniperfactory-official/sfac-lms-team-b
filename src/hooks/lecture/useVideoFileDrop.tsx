import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface useVideoFileDropProps {
  setVideoFile: (file: File | null) => void;
}

const useVideoFileDrop = ({ setVideoFile }: useVideoFileDropProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length !== 0) {
        const file: File = acceptedFiles[0];
        if (file.type.includes("video")) {
          setVideoFile(file);
        }
      }
    },
    [setVideoFile],
  );

  const handleRemoveVideoFile = () => {
    setVideoFile(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: { "video/*": [".mp4", ".wav", ".avi"] },
    noClick: true,
  });

  return {
    getRootProps,
    getInputProps,
    isDragActive,
    onDrop,
    handleRemoveVideoFile,
  };
};

export default useVideoFileDrop;
