import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface useVideoFileDropProps {
  setVideoFile: (file: File | null) => void;
}

const useVideoFileDrop = ({ setVideoFile }: useVideoFileDropProps) => {
  const [videoFileURL, setVideoFileURL] = useState<string>("");

  // 파일 업로드 핸들러
  const handleDrop = useCallback(
    (acceptedFiles: FileList | File[]) => {
      if (acceptedFiles.length !== 0) {
        const file: File = acceptedFiles[0];
        if (file.type.includes("video")) {
          // 기존에 생성한 비디오 파일의 URL을 해제 -> 메모리 누수 방지
          videoFileURL && URL.revokeObjectURL(videoFileURL);
          setVideoFileURL(URL.createObjectURL(file));
          setVideoFile(file);
        }
      }
    },
    [setVideoFile, videoFileURL],
  );

  // 업로드된 비디오파일 삭제 핸들러
  const handleRemoveVideoFile = () => {
    setVideoFile(null);
    setVideoFileURL("");
  };

  // Dropzone 컴포넌트 설정
  const { getRootProps, isDragActive } = useDropzone({
    // 드래그 앤 드롭과 파일 선택을 동시에 처리하는 핸들러 사용
    onDrop: handleDrop,
    accept: { "video/*": [] },
  });

  // DropzoneSection 컴포넌트가 언마운트될 때 videoFileURL 해제
  useEffect(() => {
    return () => {
      videoFileURL && URL.revokeObjectURL(videoFileURL);
    };
  }, [videoFileURL]);

  return {
    getRootProps,
    isDragActive,
    videoFileURL,
    handleDrop,
    handleRemoveVideoFile,
  };
};

export default useVideoFileDrop;
