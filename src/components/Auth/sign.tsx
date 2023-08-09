import { FirebaseError } from "firebase/app";
import { auth } from "@/utils/firebase";
import {
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  signOut,
} from "firebase/auth";
import { getUser } from "@/hooks/reactQuery/navbar/useGetUserQuery";
import { setCookies } from "@/app/api/cookie";

export const login = async (email: string, password: string) => {
  try {
    await setPersistence(auth, browserSessionPersistence);
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = await getUser(result.user.uid);

    // 쿠키에 정보 저장
    setCookies({ user, result });
    // console.log(result.user.stsTokenManager.accessToken, result.user.uid);
    return result.user.uid;
  } catch (error) {
    const errorCode = (error as FirebaseError).code;
    let errorMessage;
    if (errorCode === "auth/user-not-found") {
      errorMessage = "등록되지 않은 아이디입니다.";
    } else if (errorCode === "auth/wrong-password") {
      errorMessage = "비밀번호가 일치하지 않습니다.";
    } else {
      errorMessage = errorCode;
    }
    throw new Error(errorMessage); // 여기서 에러 메시지를 다시 throw
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    alert(`error : ${error}`);
  }
};
