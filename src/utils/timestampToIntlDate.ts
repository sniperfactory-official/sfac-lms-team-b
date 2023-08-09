import type { Timestamp } from "firebase/firestore";

// timestamp: fs timestamp, separator: 날짜 구분자 인자로 전달(ex) '/', '.', '-' 등)
const timestampToIntlDate = (
  timestamp: Timestamp,
  separator: string,
): string => {
  const date = new Date(timestamp.seconds * 1000); // fs timestamp를 JavaScript Date로 변환

  const options: Intl.DateTimeFormatOptions = {
    // Intl 옵션
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };
  const formattedDate = new Intl.DateTimeFormat("ko-KR", options).format(date);
  // 정규식을 통한 separator 설정 및 공백 제거
  return formattedDate
    .replace(/\.$/, "")
    .replace(/\./g, separator)
    .replace(/ /g, "");
};

export default timestampToIntlDate;
