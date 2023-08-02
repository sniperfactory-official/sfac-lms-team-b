import { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  Firestore,
  addDoc,
} from "firebase/firestore";
import axios from "axios";

const useLinkValidity = (db: Firestore) => {
  const [errorMessage, setErrorMessage] = useState("");
  /* 
  const checkLinkValidity = async (link: string) => {
    try {
      // URL에 GET 요청 보내기
      const response = await axios.get(link);
      if (response.status === 200) {
        // Firestore에서 "lecture" 컬렉션에서 입력된 링크와 일치하는 문서를 검색
        const linksRef = collection(db, "lecture");
        const q = query(linksRef, where("textContent", "==", link));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // 검색 결과가 없으면 유효하지 않은 링크로 판단
          setErrorMessage("유효하지 않은 링크입니다.");
        } else {
          setErrorMessage(""); // 검색 결과가 있으면 유효한 링크로 판단하여 에러 메시지 초기화
          await saveDataToFirebase(link);
        }
      } else {
        setErrorMessage("링크가 존재하지 않거나 접근할 수 없습니다.");
      }
    } catch (error) {
      setErrorMessage("링크 접속 중 오류가 발생했습니다.");
    }
  };

  const saveDataToFirebase = async (link: string) => {
    try {
      // Firebase에 데이터를 저장하는 로직을 구현
      const docRef = await addDoc(collection(db, "lecture"), {
        textContent: link,
      });
      console.log("Firebase에 데이터 저장 성공!", docRef.id);
    } catch (error) {
      console.error("Firebase에 데이터 저장 실패:", error);
    }
  }; */
  const checkLinkValidity = async (link: string) => {
    try {
      // URL에 GET 요청 보내기
      const response = await axios.get(link);
      if (response.status === 200) {
        // URL이 올바른 경우 에러 메시지 초기화
        setErrorMessage("");
      } else {
        setErrorMessage("링크가 존재하지 않거나 접근할 수 없습니다.");
      }
    } catch (error) {
      setErrorMessage("링크 접속 중 오류가 발생했습니다.");
    }
  };

  return { errorMessage, checkLinkValidity };
};

export default useLinkValidity;
