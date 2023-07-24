const EmptyContents = ({ emptyTxt }: { emptyTxt: string }) => {
  return (
    <div className="p-[80px] text-center text-grayscale-20">
      <p className="font-[700] text-[96px]">: (</p>
      <p className="font-[700] text-[24px]">{emptyTxt}</p>
    </div>
  );
};

export default EmptyContents;
