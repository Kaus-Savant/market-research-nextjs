import type { Metadata } from "next";
import "./globals.css";
import { DealProvider } from "./contexts/DealContext";

export const metadata: Metadata = {
  title: "SilverX — Deal Flow Management",
  description: "Investment pipeline and deal management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="m-0 p-0 box-border">
        <DealProvider>{children}</DealProvider>
      </body>
    </html>
  );
}
