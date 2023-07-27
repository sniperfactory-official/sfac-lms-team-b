const LectureTitle: React.FC = () => {
  return (
    <label htmlFor="lectureTitle">
      <input
        type="text"
        name="lectureTitle"
        id="lectureTitle"
        placeholder="제목을 입력해주세요. (필수)"
        className="text-grayscale-100 outline-none text-xl font-bold placeholder-grayscale-40"
      />
    </label>
  );
};

export default LectureTitle;
