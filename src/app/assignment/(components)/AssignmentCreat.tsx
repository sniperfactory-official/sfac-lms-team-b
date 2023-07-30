"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";

const CreateAssignment = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSelectDropdown = (event: ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    setSelectedOption(event.target.value);
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setTitle(event.target.value);
  };
  const handleContentChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(event.target.value);
    setContent(event.target.value);
  };

  const showImageAlert = () => {
    alert("이미지는 최대 다섯 개까지 선택할 수 있습니다.");
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      if (selectedFiles.length + files.length > 5) {
        showImageAlert();
      } else {
        setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(files)]);
      }
    }
  };

  const handleStartdateChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(new Date(event.target.value));

    const selectedDate = new Date(event.target.value);
    setStartDate(new Date(event.target.value));
    if (selectedDate < new Date()) {
      alert("시작 날짜는 현재 날짜보다 이전일 수 없습니다.");
    } else if (selectedDate > endDate) {
      alert("시작 날짜는 종료 날짜보다 빠를 수 없습니다.");
    }
  };

  const handleEnddateChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(new Date(event.target.value));

    const selectedDate = new Date(event.target.value);
    setEndDate(new Date(event.target.value));
    if (selectedDate < new Date()) {
      alert("종료 날짜는 현재 날짜보다 이전일 수 없습니다.");
    } else if (selectedDate < startDate) {
      alert("종료 날짜는 시작 날짜보다 늦을 수 없습니다.");
    }
  };

  const handleButtonClick = () => {
    if (!selectedOption || !title || !content || !startDate || !endDate) {
      alert("필수 입력 항목들을 모두 입력해주세요.");
      return;
    }
    console.log(selectedOption);
    console.log(title);
    console.log(selectedFiles);
  };
  return (
    <>
      <div>
        <span className="text-base font-medium mr-[19px]">과제난이도</span>
        <select
          value={selectedOption}
          onChange={handleSelectDropdown}
          className="w-[245px] h-[40px] bg-white border rounded-xl text-grayscale-40 mb-[17px]"
        >
          <option className="text-grayscale-40">난이도를 선택해주세요.</option>
          <option>초</option>
          <option>중</option>
          <option>고</option>
        </select>
      </div>
      <input
        className="w-full focus:outline-none text-xl text-grayscale-40 mb-[13px]"
        type="text"
        placeholder="제목을 입력하세요."
        onChange={handleTitleChange}
      ></input>
      <div className="w-full h-[350px] border rounded-xl p-[20px] mb-[26px]">
        <textarea
          className="w-full h-[240px] focus:outline-none resize-none"
          onChange={handleContentChange}
          placeholder="내용을 입력하세요."
        ></textarea>
        <div className="flex items-center">
          <label
            htmlFor="fileInput"
            className="w-[60px] h-[60px] bg-grayscale-10 cursor-pointer flex items-center justify-center rounded-[10px] ml-[8px]"
          >
            <input
              id="fileInput"
              type="file"
              className="hidden"
              onChange={handleFileChange}
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
          <div className="flex">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="mr-[8px] ml-[8px] w-[60px] h-[60px] overflow-hidden rounded-[10px]"
              >
                {file ? (
                  <Image
                    src={URL.createObjectURL(file)}
                    alt="assignment"
                    width="0"
                    height="0"
                    className="w-full h-full"
                  />
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto flex items-center justify-between">
        <span className="font-bold text-base mr-[12px]">제출 기간</span>
        <input
          type="date"
          value={startDate.toISOString().split("T")[0]}
          onChange={handleStartdateChange}
          className="appearance-none w-[224px] h-[33px] border border-grayscale-10 rounded-[10px]"
        ></input>
        <span> ~ </span>
        <input
          type="date"
          value={endDate.toISOString().split("T")[0]}
          onChange={handleEnddateChange}
          className="appearance-none w-[224px] h-[33px] border border-grayscale-10 rounded-[10px]"
        ></input>
        <button
          type="submit"
          className="w-[100px] h-[45px] bg-primary-80 right-0 font-bold text-white rounded-[10px]"
          onClick={handleButtonClick}
        >
          업로드
        </button>
      </div>
    </>
  );
};

export default CreateAssignment;
