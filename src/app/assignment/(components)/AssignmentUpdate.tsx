import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { Assignment } from "@/types/firebase.types";
import PageToast from "@/components/PageToast";
import { useUpdateAssignment } from "@/hooks/mutation/useUpdateAssignment";
import { useGetAssignment } from "@/hooks/queries/useGetAssignment";

interface AssignmentUpdateProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  assignmentId: string;
}

const AssignmentUpdate: React.FC<AssignmentUpdateProps> = ({
  isOpen,
  setIsOpen,
  assignmentId,
}) => {
  const [changeFiles, setChangeFiles] = useState<File[]>([]);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [isAccept, setIsAccept] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<Assignment>();

  const { data, isLoading, error } = useGetAssignment(assignmentId);

  useEffect(() => {
    if (!isLoading) {
      if (Array.isArray(data)) {
        // assignment가 배열로 넘어올 일은 없으니깐 아무 처리도 하지 않도록 우선 놔두었습니다.
      } else if (data) {
        setValue("level", data.level);
        setValue("title", data.title);
        setValue("content", data.content);

        // 시간을 yyyy.mm.dd 로 불러오는 것 추후에 해야합니다.

        // setValue("startDate", data.startDate);
        // setValue("endDate", data.endDate);
      }
    }
  }, [isOpen]);
  // 일단 isOpen으로 해놓았지만 추후 변경해보자

  const updateAssignmentMutation = useUpdateAssignment(assignmentId);

  const onSubmit: SubmitHandler<Assignment> = async assignmentData => {
    // 이미지 파일들의 경로를 문자열 배열로 변환하여 data.images에 추가
    assignmentData.images = changeFiles.map(file => URL.createObjectURL(file));

    try {
      updateAssignmentMutation.mutate(assignmentData);

      setToastMsg("과제가 성공적으로 수정되었습니다.");
      setIsAccept(true);

      setTimeout(() => {
        setIsOpen(false);
        reset();
        setChangeFiles([]);
      }, 1000); // 과제 등록이 성공하면 setTimeOut으로 모달창이 닫히게 구현했는데 맞는지 모르겠네욥
    } catch (error) {
      setToastMsg("과제 수정에 실패했습니다. 다시 시도해주세요.");
      setIsAccept(false);
    }
  };

  const MAX_FILE_SIZE_MB = 5;
  const MAX_IMAGES = 5;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);

      const oversizedFiles = fileList.filter(
        file => file.size > MAX_FILE_SIZE_MB * 1024 * 1024,
      );
      if (oversizedFiles.length > 0) {
        console.log(oversizedFiles);
        setToastMsg(`파일 용량이 너무 큽니다. (최대 ${MAX_FILE_SIZE_MB}MB).`);
        setIsAccept(false);
        return;
      }

      // 이미지 개수를 확인하여 5개 이상인 경우 토스트 메시지 표시
      if (changeFiles.length + fileList.length > MAX_IMAGES) {
        setToastMsg(`이미지는 최대 ${MAX_IMAGES}개까지 등록 가능합니다.`);
        setIsAccept(false);
        return;
      }

      setChangeFiles(prevFiles => [...prevFiles, ...fileList]);
    }
  };

  useEffect(() => {
    console.log("After setChangeFiles:", changeFiles);
  }, [changeFiles]);

  const closeToast = () => {
    setToastMsg("");
  };

  const handleImageRemove = (index: number) => {
    const newImageFiles = [...changeFiles];
    newImageFiles.splice(index, 1);
    setChangeFiles(newImageFiles);
  };

  const handleFormValidation = () => {
    if (
      !errors.level ||
      !errors.title ||
      !errors.content ||
      !errors.startDate ||
      !errors.endDate
    ) {
      setToastMsg("필수 항목을 모두 입력해주세요.");
      setIsAccept(false);
      return;
    }
    handleSubmit(onSubmit);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="level-select"
          className="text-base font-medium mr-[20px]"
        >
          과제 난이도
        </label>
        <select
          id="level-select"
          {...register("level", { required: true })}
          className="w-[245px] h-[40px] bg-white border rounded-xl text-grayscale-40 mb-[17px] pl-2"
          defaultValue="난이도를 선택해주세요"
        >
          <option value="" className="text-grayscale-40" selected hidden>
            난이도를 선택해주세요
          </option>
          <option value="초">초</option>
          <option value="중">중</option>
          <option value="고">고</option>
        </select>
      </div>

      <input
        className="w-full focus:outline-none text-xl text-grayscale-40 mb-[13px]"
        placeholder="제목을 입력해주세요"
        type="text"
        {...register("title", { required: true })}
      />
      <div className="w-full h-[350px] border rounded-xl p-[20px] mb-[26px]">
        <textarea
          className="w-full h-[240px] focus:outline-none resize-none"
          placeholder="내용을 입력해주세요"
          {...register("content", { required: true })}
        />
        <div className="flex items-center justify-start overflow-auto">
          <label
            htmlFor="update_picture"
            className="w-[60px] h-[60px] bg-grayscale-10 cursor-pointer flex items-center justify-center rounded-[10px] ml-[8px] shrink-0"
          >
            <input
              {...register("images")}
              id="update_picture"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <Image
              src={"/images/image_add.svg"}
              alt={"이미지수정"}
              width={61}
              height={61}
            />
          </label>
          <div className="flex justify-start items-center">
            {changeFiles.map((file, index) => {
              console.log(file);

              return (
                <div
                  key={index}
                  className="relative ml-[8px] w-[60px] h-[60px] overflow-hidden rounded-[10px]"
                >
                  {file ? (
                    <>
                      <Image
                        src={URL.createObjectURL(file)}
                        alt="assignment"
                        width="0"
                        height="0"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleImageRemove(index)}
                        className="absolute top-1 right-1"
                      >
                        <Image
                          src={"/images/image_delete.svg"}
                          alt={"이미지 삭제"}
                          width={14}
                          height={14}
                        />
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex justify-start items-center">
          <label
            htmlFor="submit-period"
            className="font-bold text-base mr-[12px]"
          >
            제출 기간
          </label>
          <input
            type="date"
            className="appearance-none w-[224px] h-[33px] border border-grayscale-10 rounded-[10px]"
            {...register("startDate", { required: true })}
          />
          <input
            type="date"
            className="appearance-none w-[224px] h-[33px] border border-grayscale-10 rounded-[10px]"
            {...register("endDate", { required: true })}
          />
        </div>
        <div className="flex justify-end items-center">
          <button
            type="submit"
            className="w-[100px] h-[45px] bg-primary-80 right-0 font-bold text-white rounded-[10px]"
            onClick={handleFormValidation}
          >
            수정하기
          </button>
        </div>

        <div className="absolute left-[33px] bottom-[33px]">
          {toastMsg && (
            <PageToast
              toastMsg={toastMsg}
              isAccept={isAccept}
              onClose={closeToast}
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default AssignmentUpdate;
