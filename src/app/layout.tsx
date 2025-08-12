import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import ConditionalNavigation from "@/components/ConditionalNavigation";
import ConditionalFooter from "@/components/ConditionalFooter";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Chief Media - Media as a Service Platform",
  description: "Connect vendors and realtors. Create invoices, manage projects, and grow your brand with our comprehensive media services.",
  icons: {
    icon: '/chief-media.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Providers>
          <ConditionalNavigation />
          {children}
          <ConditionalFooter />
        </Providers>
      </body>
    </html>
  );
}
