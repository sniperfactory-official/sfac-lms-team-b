import Link from "next/link";

import { XYCoord, useDrag, useDrop } from "react-dnd";
import { useRef } from "react";
import { AssignmentExtracted } from "./AssignmentLeftNavContent";

interface Props extends AssignmentExtracted {
  movecard: (dragIndex: number, hoverIndex: number) => void;
  isEditting: boolean;
}

const AssignmentLeftNavCard = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { id, title, movecard, index, isEditting } = props;

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
    hover(item: AssignmentExtracted, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset() as XYCoord;
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      movecard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  }));

  const opacity = isDragging ? 0 : 100;
  drag(drop(ref));

  return (
    <div>
      {isEditting ? (
        <div
          ref={ref}
          key={id}
          className={`list-none w-full p-[10px] order-${index} opacity-${opacity}`}
        >
          <label className="hover:cursor-pointer">
            <input
              type="checkbox"
              name={id}
              value={index}
              className="mr-[5px]"
            />
            {title}
          </label>
        </div>
      ) : (
        <div
          key={id}
          className={`list-none w-full p-[10px] order-${index} opacity-${opacity}`}
        >
          <Link href={"/assignment/" + id}>{title}</Link>
        </div>
      )}
    </div>
  );
};

export default AssignmentLeftNavCard;
