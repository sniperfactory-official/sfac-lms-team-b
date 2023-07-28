import type { Timestamp } from "firebase/firestore";

/**
 * Firebase Firestore Timestamp를 일반 날짜 문자열로 변환하는 함수
 * @param {Timestamp} firebaseTimestamp - Firebase Firestore에서 제공하는 Timestamp 객체
 * @returns {string} - "yyyy.MM.dd" 형식의 일반 날짜 문자열
 */
const timestampToDate = (firebaseTimestamp: Timestamp): string => {
  const timestampInMillis =
    firebaseTimestamp.seconds * 1000 + firebaseTimestamp.nanoseconds / 1000000;

  const date = new Date(timestampInMillis);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

export default timestampToDate;
