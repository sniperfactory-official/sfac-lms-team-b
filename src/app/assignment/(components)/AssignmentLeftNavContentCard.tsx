import Link from "next/link";

import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { AssignmentExtracted } from "./AssignmentLeftNavContent"; 


const AssignmentLeftNavCard = (props: AssignmentExtracted) => {
  const ref = useRef<HTMLDivElement>(null);
  const { id, order, title, movecard, index, isEditing } = props;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: () => {
      return { index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: "card",
    hover(item: AssignmentExtracted) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        console.log("똑같!")
        return;
      }
      movecard(dragIndex, hoverIndex);
      item.index = hoverIndex
      console.log("dragIndex:",dragIndex, "hoverIndex",hoverIndex)
    },
  }));
  const opacity = isDragging ? 0 : 100;
  drag(drop(ref));

  

  return (
    <div>
      { isEditing? (
          <div
            ref={ref}
            key={id}
            className={`list-none w-full p-[10px] order-${id} opacity-${opacity}`}
          >
            <input type="checkbox" name={id}/>
            <Link href={"/assignment/" + id}>
              {title}
              </Link>
          </div>
      ) : (
        <div
          key={id}
          className={`list-none w-full p-[10px] order-${id} opacity-${opacity}`}
        >
          <Link href={"/assignment/" + id}>{title}</Link>
        </div>
      )}
    </div>
  );
};

export default AssignmentLeftNavCard;
