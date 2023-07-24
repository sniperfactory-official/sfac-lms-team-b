"use client";

import React from "react";
import ProfileImage from "./ProfileImage";

const TeacherViewCard = () => {
  return (
    <>
      <div className="flex justify-between content-center px-[21px] py-[24px] border rounded-[10px] gap-[5px] mb-[15px]">
        <div className="flex justify-start content-center gap-[14px] grow">
          <ProfileImage />
          <div>
            <div className="mb-[5px]">
              <span className="mr-[15px] text-grayscale-100 text-[16px] font-[700]">
                김지은
              </span>
              <span className="text-grayscale-40 text-[14px] font-[400]">
                수강생
              </span>
            </div>
            <a
              className="text-grayscale-40 text-[14px] font-[400]"
              target="_blank"
              rel="noreferrer"
              href="https://github.com/sniperfactory-official/sfac-lms-team-b/blob/develop/src/app/globals.css"
            >
              https://github.com/sniperfactory-official/sfac-lms-team-b/blob/develop/src/app/globals.css
            </a>
          </div>
        </div>
        <div className="flex flex-col justify-center items-end shrink">
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <circle cx="9.98193" cy="9.5" r="9" fill="#FF3A3A" />{" "}
            <path
              d="M14.0737 14.5H12.2964L7.94873 8.21094H7.8667V14.5H5.81592V4.60156H7.62061L11.9409 10.8906H12.0366V4.60156H14.0737V14.5Z"
              fill="white"
            />{" "}
          </svg>
          <p className="text-grayscale-40 text-[14px] font-[500] mt-[5px]">
            2023/06/29
          </p>
        </div>
      </div>
    </>
  );
};

export default TeacherViewCard;
