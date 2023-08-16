import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import { Assignment } from "@/types/firebase.types";
import { Timestamp } from "firebase/firestore";
import PageToast from "@/components/PageToast";
import { useUpdateAssignment } from "@/hooks/mutation/useUpdateAssignment";
import { useGetAssignment } from "@/hooks/queries/useGetAssignment";
import useImageUpload from "@/hooks/mutation/useUpdateImage";
import "sfac-designkit-react/style.css";
import { DateSelector } from "sfac-designkit-react";
import { Button } from "sfac-designkit-react";
import { Text } from "sfac-designkit-react";

interface AssignmentUpdateProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  assignmentId: string;
}

interface AssignmentWithDates extends Assignment {
  dates: {
    startDate: Date | null;
    endDate: Date | null;
  };
}

const AssignmentUpdate: React.FC<AssignmentUpdateProps> = ({
  isOpen,
  setIsOpen,
  assignmentId,
}) => {
  const [changeFiles, setChangeFiles] = useState<File[]>([]);
  const [toastMsg, setToastMsg] = useState<string>("");
  const [isAccept, setIsAccept] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [dates, setDates] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<AssignmentWithDates>();

  const { data, isLoading, error } = useGetAssignment(assignmentId);

  useEffect(() => {
    if (!isLoading) {
      if (Array.isArray(data)) {
        // assignment가 배열로 넘어올 일은 없으니깐 아무 처리도 하지 않도록 우선 놔두었습니다.
      } else if (data) {
        setValue("level", data.level);
        setValue("title", data.title);
        setValue("content", data.content);
        setImageUrls(data.images || []);

        setDates({
          startDate: data.startDate.toDate(),
          endDate: data.endDate.toDate(),
        });
      }
    }
  }, [isOpen]);

  const updateAssignmentMutation = useUpdateAssignment(assignmentId);
  const imageUploadMutation = useImageUpload();

  const onSubmit: SubmitHandler<AssignmentWithDates> = async assignmentData => {
    if (dates.startDate === null || dates.endDate === null) return onInValid();

    assignmentData.images = changeFiles.map(file => URL.createObjectURL(file));
    if (dates.startDate && typeof dates.startDate !== "string") {
      assignmentData.startDate = Timestamp.fromDate(dates.startDate);
    }
    if (dates.endDate && typeof dates.endDate !== "string") {
      assignmentData.endDate = Timestamp.fromDate(dates.endDate);
    }
    try {
      const uploadPromises = changeFiles.map(file =>
        imageUploadMutation.mutateAsync(file),
      );
      const uploadedUrls = await Promise.all(uploadPromises);

      const updatedImages = [...imageUrls, ...uploadedUrls];
      assignmentData.images = updatedImages;

      updateAssignmentMutation.mutate(assignmentData);

      setToastMsg("과제가 성공적으로 수정되었습니다.");
      setIsAccept(true);

      setTimeout(() => {
        setIsOpen(false);
        reset();
        setChangeFiles([]);
      }, 1000);
    } catch (error) {
      setToastMsg("과제 수정에 실패했습니다. 다시 시도해주세요.");
      setIsAccept(false);
    }
  };
  const setChangeDate = (select: [Date | null, Date | null]) => {
    const [start, end] = select;
    setDates({
      startDate: start || null,
      endDate: end || null,
    });
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
        setToastMsg(`파일 용량이 너무 큽니다. (최대 ${MAX_FILE_SIZE_MB}MB).`);
        setIsAccept(false);
        return;
      }

      if (changeFiles.length + fileList.length > MAX_IMAGES) {
        setToastMsg(`이미지는 최대 ${MAX_IMAGES}개까지 등록 가능합니다.`);
        setIsAccept(false);
        return;
      }

      setChangeFiles(prevFiles => [...prevFiles, ...fileList]);
    }
  };

  const closeToast = () => {
    setToastMsg("");
  };

  const handleImageRemoveUrls = (index: number) => {
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
  };

  const handleImageRemove = (index: number) => {
    const newImageFiles = [...changeFiles];
    newImageFiles.splice(index, 1);
    setChangeFiles(newImageFiles);
  };

  const handleFormValidation = () => {
    handleSubmit(onSubmit);
  };

  const onInValid = () => {
    setToastMsg("필수 항목을 모두 입력해주세요.");
    setIsAccept(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInValid)}>
      <div>
        <Text
          size="base"
          weight="medium"
          className="text-color-Grayscale-100 text-grayscale-100 mr-[20px]"
        >
          과제 난이도
        </Text>
        <select
          id="level-select"
          {...register("level", { required: true })}
          className="w-[245px] h-[40px] bg-white border rounded-xl text-grayscale-40 mb-[17px] pl-2"
          defaultValue="placeholder"
        >
          <option value="placeholder" className="text-grayscale-40" hidden>
            난이도를 선택해주세요
          </option>
          <option value="초">초</option>
          <option value="중">중</option>
          <option value="고">고</option>
        </select>
      </div>

      <input
        className="w-full focus:outline-none text-lg text-grayscale-40 mb-[13px]"
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
            {imageUrls.map((imageUrl, index) => (
              <div
                key={index}
                className="relative ml-[8px] w-[60px] h-[60px] overflow-hidden rounded-[10px]"
              >
                <Image
                  src={imageUrl}
                  alt="assignment"
                  layout="fill"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => handleImageRemoveUrls(index)}
                  className="absolute top-1 right-1"
                >
                  <Image
                    src={"/images/image_delete.svg"}
                    alt={"이미지 삭제"}
                    width={14}
                    height={14}
                  />
                </button>
              </div>
            ))}

            {changeFiles.map((file, index) => (
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
            ))}
          </div>
        </div>
      </div>

      <div className="flex absolute w-full left-0 h-[50px] bottom-[33px] items-center justify-between px-[33px]">
        <div className="flex justify-start items-center">
          <Text
            size="base"
            weight="bold"
            className="text-color-Grayscale-100 mr-[12px]"
          >
            제출 기간
          </Text>
          <div>
            <DateSelector
              selected={dates.startDate}
              startDate={dates.startDate}
              endDate={dates.endDate}
              ChangeDate={setChangeDate}
            />
          </div>
        </div>
        <div className="flex items-center">
          <Button
            type="submit"
            variant="primary"
            text="수정하기"
            asChild
            onClick={handleFormValidation}
          />
        </div>

        <div className="absolute left-[33px]">
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
