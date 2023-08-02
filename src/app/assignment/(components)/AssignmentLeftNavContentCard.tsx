import Link from "next/link";
import { Assignment } from "@/types/firebase.types";
import {useDrag, useDrop} from 'react-dnd'
import {useRef} from 'react'

export interface AssignmentExtracted extends Pick<Assignment, "id" | "order" | "title" > {
  movecard:(dragIndex:Number, hoverIndex:Number)=> void;
  index:number;
}

const AssignmentLeftNavBlock = (props:AssignmentExtracted) => {
  console.log("[COMP]AssignmentLeftNavBlock 실행!");

  const ref = useRef<HTMLDivElement>(null)
  const {id, order, title, movecard, index} = props;
  const [{isDragging}, drag] = useDrag(
    ()=> ({
      type: "card",
      item: ()=>{
          return {index}},
      collect: (monitor:any) => ({
        isDragging: monitor.isDragging()
      })
    })
  )

  const [, drop] = useDrop(
    () => ({
      accept : "card",
      hover(item: AssignmentExtracted){
        if (!ref.current) {
          return
        }
        const dragIndex = item.index
        const hoverIndex = index
        
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
        movecard(dragIndex, hoverIndex)
        console.log(dragIndex, hoverIndex)

        item.index = hoverIndex
      },
    })
  )
  const opacity = isDragging ? 0 : 100
  drag(drop(ref))
  
  return(
      <div ref={ref} key={id} className={`list-none w-full p-[10px] order-${index} opacity-${opacity}`}>
        <Link href={"/assignment/" + order}>
          {title}
        </Link>
      </div>
    )
};

export default AssignmentLeftNavBlock;