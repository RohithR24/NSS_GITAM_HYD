import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/app/components/sections/NavBar";
import Footer from './components/sections/Footer';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "NSS GITAM University",
  description: "NSS GITAM University, Hyderabad",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
