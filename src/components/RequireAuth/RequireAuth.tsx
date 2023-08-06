import { LectureCommentProvider } from "@/app/classroom/(components)/contexts/LectureCommentProvider";
import Navbar from "@/components/Header/Navbar";
import Tab from "@/components/Header/Tab";
import Footer from "@/components/Footer/Footer";
import { useAppSelector } from "@/redux/store";
import { useParams } from "next/navigation";

export default function RequireAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  const uid = useAppSelector(state => state.userId.uid);
  const isLecturePage = useParams().lectureId?.length > 0;

  return (
    <>
      {uid && !isLecturePage ? (
        <>
          <Navbar />
          <Tab />
          {children}
          <Footer />
        </>
      ) : (
        <LectureCommentProvider>{children}</LectureCommentProvider>
      )}
    </>
  );
}
