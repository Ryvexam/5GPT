import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevSuite | Developer Tools Dashboard",
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
        {children}
      </body>
    </html>
  );
}
