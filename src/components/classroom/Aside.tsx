import Button from "./Button";
import { useState } from "react";

const Aside = () => {
  const [contentCardList, setContentCardList] = useState<string[]>([]);
  return (
    <aside className="w-1/5 h-100 flex items-center flex-col mr-[20px] pt-[100px]">
      {contentCardList.map(e => (
        <div
          key={e}
          className="rounded w-[245px] h-[46px] bg-primary-5 flex justify-center items-center mb-[15px]"
        >
          {e}
        </div>
      ))}
      <Button text="섹션 추가" src="/images/plus.svg" />
      <Button text="섹션 수정" src="/images/edit.svg" />
    </aside>
  );
};

export default Aside;
