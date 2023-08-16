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
          <div className="group break-all flex justify-start items-center">
            <div className=" flex items-center group-hover:cursor-pointer mr-[5px] w-[15px] h-[15px]">
              <input
                type="checkbox"
                name={id}
                id={id}
                value={index}
                className="hidden peer/inputBox group-hover:cursor-pointer"
                />
              <label htmlFor={id} className="group-hover:cursor-pointer inline-block border w-[15px] h-[15px] bg-cover border-[#B2CDFF] rounded-[5px] peer-checked/inputBox:bg-[url('/images/icon_target.svg')] peer-checked/inputBox:border-none"></label>
            </div>
              <label htmlFor={id} className="group-hover:cursor-pointer">
                <Text
                  size="sm"
                  weight="medium"
                  className="text-color-Grayscale-100 text-grayscale-100 mr-[20px]"
                >    
                  {title}
                </Text>
              </label>
          </div>
        </div>
      ) : (
        
        <Link className="break-all" href={`/assignment/${id}`}>
        <div
          key={id}
          className={`list-none w-full truncate ... h-[37px] mb-[5px] order-${index} rounded-[10px] hover:bg-[#f5f8ff]  ${
            isFocused ? "bg-[#f5f8ff]" : "bg-white"
          }       `}
        >
          <div className=" inline-block mr-[5px] w-[15px] h-[15px]"></div>
            <Text
              size="sm"
              weight="medium"
              className={`text-color-Grayscale-100 leading-[37px] text-grayscale-100 mr-[20px]`}
            >
              {title}
            </Text>
        </div>
      </Link>
      )}
    </div>
  );
};

export default AssignmentLeftNavCard;
