"use client";

import { useRef } from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { AssignmentExtracted } from "./AssignmentLeftNavContent";
import { Text } from "sfac-designkit-react";

interface Props extends AssignmentExtracted {
  movecard: (dragIndex: number, hoverIndex: number) => void;
  isEditting: boolean;
}

const AssignmentLeftNavCard = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { id, title, movecard, index, isEditting } = props;
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();
  const [isHoverred, setIsHoverred] = useState(false);

  useEffect(() => {
    const assignId = String(pathname).replace("/assignment/", "");
    if (assignId == id) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  }, [pathname, id]);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: () => {
      return { index, isHoverred };
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => {
      setIsHoverred(false);
    },
  }));

  const [, drop] = useDrop(() => ({
    accept: "card",
    hover(item: AssignmentExtracted, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        setIsHoverred(true);
        setTimeout(() => {
          setIsHoverred(false);
        }, 1000);
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset() as XYCoord;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        setIsHoverred(false);
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        setIsHoverred(false);
        return;
      }

      movecard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  }));

  let opacity;
  if (isDragging === true || isHoverred === true) {
    opacity = 0;
  } else if (isDragging === false || isHoverred === false) {
    opacity = 100;
  }
  drag(drop(ref));

  return (
    <div>
      {isEditting ? (
        <div
          ref={ref}
          key={id}
          className={`list-none w-full p-[10px] mb-[5px] order-${index} opacity-${opacity}`}
        >
          <label className="hover:cursor-pointer break-all">
            <input
              type="checkbox"
              name={id}
              value={index}
              className="hidden peer/inputBox"
            />
            <div className="inline-block border w-[15px] h-[15px] mr-[5px] border-[#B2CDFF] rounded-[5px] peer-checked/inputBox:hidden"></div>
            <Image
              className="hidden peer-checked/inputBox:inline-block mr-[5px]"
              width="20"
              height="20"
              src="/images/icon_target.svg"
              alt=""
            />
            <Text
              size="sm"
              weight="medium"
              className="text-color-Grayscale-100 text-grayscale-100 mr-[20px]"
            >
              {title}
            </Text>
          </label>
        </div>
      ) : (
        <div
          key={id}
          className={`list-none w-full p-[10px] mb-[5px] order-${index}`}
        >
          <Link className="break-all" href={`/assignment/${id}`}>
            <span className={`${isFocused ? "text-[#2563eb]" : "text-black"}`}>
              <Text
                size="sm"
                weight="medium"
                className="text-color-Grayscale-100 text-grayscale-100 mr-[20px]"
              >
                {title}
              </Text>
            </span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AssignmentLeftNavCard;
