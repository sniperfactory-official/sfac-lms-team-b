import useVideoFileDrop from "@/hooks/lecture/useVideoFileDrop";

const DropzoneSection: React.FC = () => {
  const { getRootProps, getInputProps, isDragActive } = useVideoFileDrop();

  return (
    <div
      {...getRootProps()}
      className="flex-1 gap-[10px] border-[10px] border-solid border-transparent rounded-[10px] flex flex-col justify-center items-center"
      style={{
        borderImageSource: "url('/images/dropzoneBorder.svg')",
        borderImageSlice: "100",
        borderImageRepeat: "repeat",
        borderImageWidth: "10",
      }}
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
      <input {...getInputProps()} id="videoFile" />
    </div>
  );
};

export default DropzoneSection;
