import type { Metadata } from "next";
import "./globals.css";
import MainLayout from "./components/MainLayout";

export const metadata: Metadata = {
  title: "ToolsWithAI | Developer Tools Dashboard",
  description: "Efficient developer tooling with AI-powered automation for code generation, testing, and productivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}
