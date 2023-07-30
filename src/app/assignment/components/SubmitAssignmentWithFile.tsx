import PageToast from "@/components/PageToast";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type OwnProps = {
  onClose: () => void;
};

const SubmitAssignmentWithFile: React.FC<OwnProps> = ({ onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [isAccept, setIsAccept] = useState<boolean>(false);
  const allowedFileTypes = [
    // 허용되는 확장자
    "application/pdf",
    "image/png",
    "image/gif",
    "image/jpeg",
    "video/mp4",
  ];

  const MAX_FILE_SIZE_MB = 5; // 용량 제한 (MB)

  // 컴포넌트의 불필요한 리렌더링을 방지 - 성능 최적화
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // 중복 파일 체크
    const validFiles = acceptedFiles.filter(file =>
      allowedFileTypes.includes(file.type),
    );

    // 용량 제한 체크
    const oversizedFiles = acceptedFiles.filter(
      file => file.size > MAX_FILE_SIZE_MB * 1024 * 1024,
    );
    if (oversizedFiles.length > 0) {
      setToastMsg("파일 용량이 너무 큽니다. (최대 5MB).");
      setIsAccept(false);
      return;
    }

    // 허용된 파일 타입 체크(pdf, png, gif, jpg, mp4)
    const disallowedTypeFiles = acceptedFiles.filter(
      file => !allowedFileTypes.includes(file.type),
    );
    if (disallowedTypeFiles.length > 0) {
      const disallowedType = disallowedTypeFiles
        .map(file => file.type)
        .join(", ");
      setToastMsg(`파일 형식이 올바르지 않습니다. (${disallowedType})`);
      setIsAccept(false);
      return;
    }

    // 파일 업로드 진행
    if (acceptedFiles.length > 0) {
      setSelectedFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
      // handleUpload(selectedFiles);
    }
  }, []);

  const handleUpload = useCallback(() => {
    // 선택한 파일들의 업로드 수행
    console.log("Uploaded files:", selectedFiles);
  }, [selectedFiles]);

  const handleRemoveFile = (file: File) => {
    setSelectedFiles(prevFiles =>
      prevFiles.filter(prevFile => prevFile !== file),
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  const closeToast = () => {
    setToastMsg("");
  };

  return (
    <>
      <div>
        {selectedFiles.length > 0
          ? selectedFiles.map((file, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between items-center mb-[20px]"
                >
                  <div className="flex justify-start items-center gap-[13px]">
                    <svg
                      width="37"
                      height="40"
                      viewBox="0 0 37 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24.8966 11.7962L13.1112 23.5817C12.9176 23.7751 12.764 24.0047 12.6592 24.2575C12.5544 24.5103 12.5004 24.7812 12.5003 25.0549C12.5002 25.3285 12.554 25.5995 12.6587 25.8523C12.7633 26.1052 12.9167 26.335 13.1101 26.5285C13.3035 26.7221 13.5332 26.8757 13.786 26.9805C14.0388 27.0853 14.3097 27.1393 14.5833 27.1394C14.857 27.1395 15.128 27.0857 15.3808 26.981C15.6337 26.8764 15.8634 26.723 16.057 26.5296L27.8424 14.7442C29.0146 13.572 29.6731 11.9821 29.6731 10.3244C29.6731 8.66662 29.0146 7.07677 27.8424 5.90457C26.6702 4.73237 25.0804 4.07383 23.4226 4.07383C21.7649 4.07383 20.175 4.73237 19.0028 5.90457L7.21741 17.69C5.30492 19.6519 4.24236 22.2882 4.25992 25.028C4.27747 27.7677 5.37372 30.3902 7.3112 32.3274C9.24867 34.2646 11.8714 35.3605 14.6111 35.3777C17.3509 35.3949 19.9871 34.3319 21.9487 32.4192L33.7341 20.6358L36.6799 23.5817L24.8966 35.3671C23.5423 36.7213 21.9346 37.7956 20.1652 38.5285C18.3957 39.2614 16.4993 39.6386 14.5841 39.6386C12.6689 39.6386 10.7724 39.2614 9.00299 38.5285C7.23357 37.7956 5.62583 36.7213 4.27158 35.3671C2.91732 34.0128 1.84307 32.4051 1.11015 30.6357C0.377228 28.8662 -2.018e-08 26.9698 0 25.0546C2.018e-08 23.1394 0.377228 21.2429 1.11015 19.4735C1.84307 17.7041 2.91732 16.0963 4.27158 14.7421L16.057 2.95874C18.0186 1.04597 20.6548 -0.0169618 23.3946 0.000204745C26.1343 0.0173713 28.757 1.11325 30.6945 3.05045C32.6319 4.98765 33.7282 7.61018 33.7457 10.3499C33.7633 13.0897 32.7007 15.726 30.7882 17.6879L19.0028 29.4775C17.8304 30.6494 16.2403 31.3076 14.5826 31.3072C12.9249 31.3068 11.3352 30.6479 10.1632 29.4754C8.99132 28.3029 8.33316 26.7129 8.33355 25.0552C8.33394 23.3974 8.99285 21.8077 10.1653 20.6358L21.9487 8.8504L24.8966 11.7962Z"
                        fill="#337AFF"
                      />
                    </svg>
                    <p className="text-[16px] text-primary-80 font-[700]">
                      {file.name}
                    </p>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="text-[12px] text-grayscale-100 font-[400]"
                      onClick={() => {
                        handleRemoveFile(file);
                      }}
                    >
                      삭제
                    </button>
                  </div>
                </div>
              );
            })
          : null}
      </div>

      {/* drop-zone */}
      <div
        {...getRootProps({
          className: `dropzone ${selectedFiles.length >= 5 ? "hidden" : ""}`,
        })}
      >
        <div className="w-full h-[244px] flex justify-center items-center border-dashed border rounded-[10px]">
          <div>
            <p className="mb-[10px] text-[20px] text-grayscale-30 font-[700]">
              파일을 여기로 드래그 해주세요
            </p>
            <div className="flex justify-center items-center">
              <input
                {...getInputProps()}
                className="hidden"
                id="assignmentFile"
                type="text"
              />
              <label
                className="py-[9.5px] px-[35.5px] bg-grayscale-5 text-grayscale-50 rounded-[10px] font-[700]"
                htmlFor="assignmentFile"
              >
                컴퓨터에서 파일 선택
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* END drop-zone */}

      <div className="flex justify-between items-center mt-[18px]">
        <div>
          {toastMsg && (
            <PageToast
              toastMsg={toastMsg}
              isAccept={isAccept}
              onClose={closeToast}
            />
          )}
        </div>
        <div className="flex justify-items-end items-center gap-[12px]">
          <button className="border" type="button" onClick={onClose}>
            취소
          </button>
          <button
            className="border"
            type="button"
            onClick={() => {
              handleUpload();
            }}
          >
            업로드
          </button>
        </div>
      </div>
    </>
  );
};

export default SubmitAssignmentWithFile;