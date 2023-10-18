"use client";

import { useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";

const tabs = [
  {
    name: "커뮤니티",
    url: "/community",
    segment: "community",
  },
  {
    name: "과제방",
    url: "/assignment",
    segment: "assignment",
  },
  {
    name: "강의실",
    url: "/classroom",
    segment: "classroom",
  },
];

export default function Tab() {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="mb-[160px]">
      <div
        className="fixed left-0 top-[60px] w-full bg-white"
        style={{ zIndex: "999" }}
      >
        <div className="max-w-[1024px] mx-auto my-0 ">
          <div className="flex justify-center h-[50px] bg-white ">
            <div className="flex justify-between w-full">
              {tabs.map(({ name, url, segment: tabSegment }) => (
                <div
                  key={url}
                  className={`w-1/3 text-lg flex items-center justify-center ${
                    segment === tabSegment
                      ? "text-blue-600 border-b-4 border-blue-600 justify-center"
                      : ""
                  }`}
                >
                  <Link href={url}>
                    <button>{name}</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
