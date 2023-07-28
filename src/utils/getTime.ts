export const getTime = (time: Date) => {
  const today = new Date();
  const timeDifferenceInSeconds = Math.floor(
    (today.getTime() - time.getTime()) / 1000,
  );

  const minutes = timeDifferenceInSeconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const years = days / 365;

  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;
  if (days < 365) return `${Math.floor(days)}일 전`;

  return `${Math.floor(years)}년 전`;

};
