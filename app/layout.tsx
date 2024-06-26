import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CustomNavbar from "./components/CustomNavbar";
import CustomFooter from "./components/CustomFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple Todo App",
  description: "Simple Todo App using NextJs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomNavbar/>
        {children}
        <CustomFooter/>
         </body>
    </html>
  );
}
