"use client";
import Navbar from "@/components/Header/Navbar";
import Tab from "@/components/Header/Tab";
import Footer from "@/components/Footer/Footer";
import { usePathname } from "next/navigation";
function RequireAuth({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isTargetRoute = [
    "/classroom",
    "/community",
    "/assignment",
    "/mypage",
  ].includes(pathname);

  return (
    <>
      {isTargetRoute ? (
        <>
          <Navbar />
          <Tab />
          {children}
          <Footer />
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

export default RequireAuth;
