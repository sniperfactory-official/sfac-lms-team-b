"use client";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

interface DragItem {
  id: string;
  index: number;
}

const ItemType = {
  ITEM: "item",
};

const DndItem: React.FC<{
  id: string;
  index: number;
  child: React.ReactNode;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}> = ({ id, index, child, moveItem }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag({
    type: ItemType.ITEM,
    item: { id, index },
  });

  const [, drop] = useDrop<DragItem, {}, {}>({
    accept: ItemType.ITEM,
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      console.log(dragIndex, hoverIndex);

      moveItem(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return <div ref={ref}>{child}</div>;
};

export default DndItem;
