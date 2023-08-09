import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "./Provider";
import "sfac-designkit-react/style.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "스나이퍼팩토리",
  description: "스나이퍼팩토리",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
