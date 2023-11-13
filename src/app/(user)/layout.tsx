import AppHeader from "@/components/header/app.header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FACENET",
  description: "Social media website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  );
}
