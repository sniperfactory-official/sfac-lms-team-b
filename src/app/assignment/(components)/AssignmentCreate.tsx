import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import { Assignment } from "@/types/firebase.types";
import { useCreateAssignment } from "@/hooks/mutation/useCreateAssignment";

export default function AssignmentCreate() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Assignment>();

  const onSubmit: SubmitHandler<Assignment> = data => {
    // 이미지 파일들의 경로를 문자열 배열로 변환하여 data.images에 추가
    data.images = imageFiles.map(file => URL.createObjectURL(file));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileList = Array.from(files);
      setImageFiles(prevFiles => [...prevFiles, ...fileList]);
    }
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
            <svg
              width="28"
              height="29"
              viewBox="0 0 28 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.6774 14.3333C27.6774 15.4379 26.782 16.3333 25.6774 16.3333H15.9931V26.636C15.9931 27.7115 15.1212 28.5833 14.0457 28.5833C12.9702 28.5833 12.0984 27.7115 12.0984 26.636V16.3333H2.41406C1.30949 16.3333 0.414062 15.4379 0.414062 14.3333V14.25C0.414062 13.1454 1.30949 12.25 2.41406 12.25H12.0984V1.94738C12.0984 0.871872 12.9702 0 14.0457 0C15.1212 0 15.9931 0.871872 15.9931 1.94738V12.25H25.6774C26.782 12.25 27.6774 13.1454 27.6774 14.25V14.3333Z"
                fill="#808080"
              />
            </svg>
          </label>
          <div className="flex justify-start items-center">
            {imageFiles.map((file, index) => (
              <div
                key={index}
                className="ml-[8px] w-[60px] h-[60px] overflow-hidden rounded-[10px]"
              >
                {file ? (
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="assignment"
                    width="0"
                    height="0"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  ""
                )}
              </div>
            ))}
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
          >
            업로드
          </button>
        </div>
      </div>
    </form>
  );
}