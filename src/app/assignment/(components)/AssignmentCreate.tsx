import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { Assignment } from "@/types/firebase.types";
import PageToast from "@/components/PageToast";
import { useCreateAssignment } from "@/hooks/mutation/useCreateAssignment";

export default function AssignmentCreate() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [isAccept, setIsAccept] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Assignment>();

  const onSubmit: SubmitHandler<Assignment> = async data => {
    // 이미지 파일들의 경로를 문자열 배열로 변환하여 data.images에 추가
    data.images = imageFiles.map(file => URL.createObjectURL(file));
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
      if (imageFiles.length + fileList.length > MAX_IMAGES) {
        setToastMsg(`이미지는 최대 ${MAX_IMAGES}개까지 등록 가능합니다.`);
        setIsAccept(false);
        return;
      }
      setImageFiles(prevFiles => [...prevFiles, ...fileList]);
    }
  };

  const closeToast = () => {
    setToastMsg("");
  };

  const handleImageRemove = (index: number) => {
    const newImageFiles = [...imageFiles];
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);
  };

  const handleFormValidation = () => {
    if (
      !errors.title ||
      !errors.content ||
      errors.startDate ||
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
        >
          <option className="text-grayscale-40">난이도를 선택해주세요</option>
          <option value="상">상</option>
          <option value="중">중</option>
          <option value="하">하</option>
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
            htmlFor="picture"
            className="w-[60px] h-[60px] bg-grayscale-10 cursor-pointer flex items-center justify-center rounded-[10px] ml-[8px] shrink-0"
          >
            <input
              {...register("images", { required: true })}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              multiple
            />
            <Image
              src={"/images/image-add.svg"}
              alt={"이미지추가"}
              width={61}
              height={61}
            />
          </label>
          <div className="flex justify-start items-center">
            {imageFiles.map((file, index) => (
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
                        src={"images/image-delete.svg"}
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
            ))}
          </div>
        </div>
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
            업로드
          </button>
        </div>
      </div>
    </form>
  );
}
