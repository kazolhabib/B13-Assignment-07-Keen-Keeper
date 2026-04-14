import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Keen Keeper",
  description: "Nurture your social connections and track relationship health effortlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="font-sans min-h-full flex flex-col bg-[#F8FAFC]">
        <Header />
        <div className="max-w-[1110px] mx-auto w-full flex-1 flex flex-col">
          <main className="">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
