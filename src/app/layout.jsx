import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navigation/Navbar";
import Footer from "@/components/navigation/Footer";
import AOSProvider from "@/components/AOSProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mawthouq",
  description:
    "Mawthouq is a bilingual guest post publishing platform that helps businesses and website owners publish articles on high-authority sites, with full Arabic and English support and a seamless user experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} flex flex-col min-h-screen`}>
        <Navbar />
        <main className="antialiased relative flex-1">
          <AOSProvider>{children}</AOSProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
