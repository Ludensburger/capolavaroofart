import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Art Jan Elaine A. Ylanan — Artist",
  description: "Portfolio of Art Jan Elaine A. Ylanan. Charcoal, conté, and oil paint. Selected works, exhibitions, and studio practice.",
  icons: {
    icon: "/favicon/artofart.jpg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
