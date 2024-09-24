import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Frontend 7Solution",
  description: "Frontend Assignment at 7Solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
       
      >
        {children}
      </body>
    </html>
  );
}
