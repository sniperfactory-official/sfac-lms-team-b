import PageToast from "@/components/PageToast";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useSubmitAssignment } from "@/hooks/mutation/useSubmitAssignment";
import useFilesUpload from "@/hooks/mutation/useUpdateFiles";
import { Button, Text } from "sfac-designkit-react";

type TAssignmentSubmitWithFileProps = {
  onClose: () => void;
  assignmentId: string;
  userId: string;
};

const AssignmentSubmitWithFile = ({
  onClose,
  assignmentId,
  userId,
}: TAssignmentSubmitWithFileProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [isAccept, setIsAccept] = useState<boolean>(false);
  const [isDraggedOver, setIsDraggedOver] = useState<boolean>(false);
  const { mutate, isLoading, error } = useSubmitAssignment(
    assignmentId,
    userId,
  );

  const filesUploadMutation = useFilesUpload();

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggedOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    // 자식 요소 체크 후 isDraggedOver 종료
    if (
      e.relatedTarget === null ||
      !e.currentTarget.contains(e.relatedTarget as Node)
    ) {
      setIsDraggedOver(false);
    }
  };

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
    setIsDraggedOver(false); // onDrop(파일첨부) 발생하면 border-color 원래대로 변경

    // 용량 제한 체크
    const oversizedFiles = acceptedFiles.filter(
      file => file.size > MAX_FILE_SIZE_MB * 1024 * 1024,
    );
    if (oversizedFiles.length > 0) {
      setToastMsg(`파일 용량이 너무 큽니다. (최대 ${MAX_FILE_SIZE_MB}MB).`);
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

    // 파일 담아두기
    if (acceptedFiles.length > 0) {
      // 파일명 변경하기
      const newSelectedFiles: File[] = acceptedFiles.map(file => {
        const uniqueFileName = generateUniqueFileName(file.name); // 유니크한 파일명 생성
        return new File([file], uniqueFileName); // 새로운 파일명으로 파일 생성
      });

      setSelectedFiles(prevFiles => [...prevFiles, ...newSelectedFiles]);
      // setSelectedFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // let newFiles = selectedFiles.map(file => URL.createObjectURL(file));

  const handleUpload = async () => {
    // 선택한 파일들의 업로드 수행

    let newFiles = selectedFiles.map(file => URL.createObjectURL(file));

    try {
      const uploadPromises = selectedFiles.map(file =>
        filesUploadMutation.mutateAsync(file),
      );
      const uploadedUrls = await Promise.all(uploadPromises);
      newFiles = uploadedUrls;
      const newAttachmentArray: { name: string; url: string }[] = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        const newObj = {
          name: selectedFiles[i].name,
          url: newFiles[i],
        };
        newAttachmentArray.push(newObj);
      }

      mutate(newAttachmentArray);
      setToastMsg("파일이 업로드되었습니다!");
      setIsAccept(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setToastMsg("과제 제출에 실패했습니다. 다시 시도해주세요.");
      setIsAccept(false);
    }
  };

  const generateUniqueFileName = (originalFileName: string): string => {
    // 랜덤 파일명 생성
    const timestamp = new Date().getTime(); // 현 시각 기준 유니크한 값 생성
    const uniqueString = Math.random().toString(36).substring(7); // 랜덤 문자열 생성
    const fileExtension = originalFileName.split(".").pop(); // 파일 확장자 추출
    const lastDotIndex = originalFileName.lastIndexOf(".");
    const fileoriginalName = originalFileName.substring(0, lastDotIndex); // 본래 파일명 추출
    return `${fileoriginalName}_${timestamp}_${uniqueString}.${fileExtension}`;
  };

  const handleRemoveFile = (file: File) => {
    setSelectedFiles(prevFiles =>
      prevFiles.filter(prevFile => prevFile !== file),
    );
  };

  const { getRootProps, getInputProps, isFocused } = useDropzone({
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
                  className="flex justify-between items-center mb-[20px] gap-[5px]"
                >
                  <div className="flex justify-start items-center gap-[13px]">
                    <div className="w-[36.5px] h-[43.5px]">
                      <Image
                        src="/images/fileIcon.svg"
                        alt=""
                        width="0"
                        height="0"
                        className="w-full h-full"
                      />
                    </div>
                    <Text
                      size="base"
                      weight="bold"
                      className="text-primary-80 text-color-Primary-80 break-all"
                    >
                      {file.name}
                    </Text>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="text-[12px] text-grayscale-100 font-[400] w-[23px] shrink-0"
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
          className: `${selectedFiles.length >= 5 ? "hidden" : ""}`,
          onDragEnter: handleDragEnter,
          onDragLeave: handleDragLeave,
        })}
      >
        <div
          className={`w-full h-[244px] flex justify-center items-center border-dashed border rounded-[10px] ${
            isDraggedOver ? "border-primary-80" : "border-grayscale-20"
          }`}
        >
          <div>
            <div className="mb-[10px]">
              <Text
                size="xl"
                weight="bold"
                className="text-grayscale-30 text-color-Grayscale-30 mb-[10px]"
              >
                파일을 여기로 드래그 해주세요
              </Text>
            </div>

            <div className="flex justify-center items-center">
              <input
                {...getInputProps()}
                className="hidden"
                id="assignmentFile"
                type="text"
              />
              <label
                className="py-[9.5px] px-[35.5px] bg-primary-80 text-white rounded-[10px] font-[700]"
                htmlFor="assignmentFile"
              >
                컴퓨터에서 파일 선택
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* END drop-zone */}

      {/* bottom-button */}
      <div className="absolute left-0 bottom-0 w-full min-h-[97px] p-[20px_31px_42px]">
        <div className="flex justify-end items-center gap-[12px]">
          <Button variant="secondary" text="취소" asChild onClick={onClose} />
          <Button
            variant="primary"
            text="업로드"
            asChild
            onClick={() => {
              handleUpload();
            }}
          />
        </div>
      </div>
      {/* 토스트메세지 */}
      <div className="absolute left-[33px] bottom-[33px]">
        {toastMsg && (
          <PageToast
            toastMsg={toastMsg}
            isAccept={isAccept}
            onClose={closeToast}
          />
        )}
      </div>
    </>
  );
};

export default AssignmentSubmitWithFile;
