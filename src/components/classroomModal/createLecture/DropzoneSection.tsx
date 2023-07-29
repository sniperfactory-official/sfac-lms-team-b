import useVideoFileDrop from "@/hooks/lecture/useVideoFileDrop";

interface DropzoneSectionProps {
  setVideoFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const DropzoneSection: React.FC<DropzoneSectionProps> = ({ setVideoFile }) => {
  const { getRootProps, isDragActive, videoFileURL, handleDrop } =
    useVideoFileDrop({
      setVideoFile: setVideoFile,
    });

  return (
    <div
      {...getRootProps()}
      className="h-72 border border-dashed border-grayscale-20 gap-[10px] rounded-[10px] flex flex-col justify-center items-center"
      onClick={() => {}}
    >
      <p className="text-grayscale-30 text-xl font-bold">
        {isDragActive
          ? "파일을 이곳에 드롭하세요"
          : "파일을 여기로 드래그 해주세요"}
      </p>

      <label
        htmlFor="videoFile"
        className="w-52 h-10 cursor-pointer font-bold text-base bg-grayscale-5 text-grayscale-50 rounded-[10px] flex flex-col justify-center items-center hover:text-white hover:bg-primary-80"
      >
        컴퓨터에서 파일 선택
      </label>
      <input
        type="file"
        name="videoFile"
        id="videoFile"
        key={videoFileURL}
        className="hidden"
        accept="video/*"
        onChange={e => handleDrop(e.target.files || [])}
      />
    </div>
  );
};

export default DropzoneSection;
