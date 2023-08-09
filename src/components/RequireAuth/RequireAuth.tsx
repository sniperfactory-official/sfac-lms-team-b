import { LectureCommentProvider } from "@/app/classroom/(components)/contexts/LectureCommentProvider";
import { VideoRefProvider } from "@/app/classroom/(components)/contexts/VideoContextProvider";
import Navbar from "@/components/Header/Navbar";
import Tab from "@/components/Header/Tab";
import Footer from "@/components/Footer/Footer";
import { auth } from "@/utils/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../Loading/Loading";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/redux/store";
export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
      setLoading(false);
    });

    // unmounted 됐을 때 메모리 누수의 문제가 발생할 수 있으니 cleanup()함수 사용
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    // 로그인이 되지 않았거나 로딩이 안 돼면 계속 로그인 페이지
    if (!loading && !authenticated) {
      router.push("/");
    } else {
      // 성공시 커뮤니티 페이로 이동
      router.push("/community");
    }
  }, [loading, authenticated]);
  const pathname = usePathname();

  const isTargetRoute = [
    "/classroom",
    "/community",
    "/assignment",
    "/mypage",
  ].includes(pathname);

  // 로딩 상태면 Loading Spinner 사용
  if (loading) {
    return <LoadingSpinner />; // <- 수정된 부분
  } else {
    if (authenticated && isTargetRoute) {
      return (
        <>
          <Navbar />
          <Tab />
          {children}
          <Footer />
        </>
      );
    } else {
      return (
        <LectureCommentProvider>
          <VideoRefProvider>{children}</VideoRefProvider>
        </LectureCommentProvider>
      );
    }
  }
}
