import "./globals.css";
import { Darker_Grotesque } from "next/font/google";
import { TransactionProvider } from "./provider";
import { Analytics } from "@vercel/analytics/react";

const fontFamily = Darker_Grotesque({ subsets: ["latin"] });

export const metadata = {
  title: "YNAB Monthly Recap Tool",
  description:
    "A tool to generate recap reports based on YNAB transactions csv. The following reports will be generated",
  icons: {
    icon: "/faviconv2.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <TransactionProvider>
        <body className={fontFamily.className}>{children}</body>
      </TransactionProvider>
      <Analytics />
    </html>
  );
}
